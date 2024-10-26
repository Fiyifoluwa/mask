import React, {ReactElement, ReactNode} from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {renderHook} from '@testing-library/react-hooks';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {InventoryProvider, useInventory} from '../src/context/InventoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Home} from '../src/screens/Home';
import {AddItem} from '../src/screens/AddItem';
import {EditItem} from '../src/screens/EditItem';
import {theme} from '../src/theme';
import type {AppStackScreenProps} from '../src/navigation/types';
import {ThemeProvider} from '@shopify/restyle';
import {Alert} from 'react-native';
import {StorageService} from '../src/utils/storage';

type EditItemProps = AppStackScreenProps<'EditItem'>;

const mockItem = {
  id: '1',
  name: 'Test Item',
  totalStock: '10',
  price: '9999',
  description: 'This is a test item description',
  lastModified: new Date().toISOString(),
};

const mockInventoryContext = {
  addItem: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
  state: {
    items: [mockItem],
    loading: false,
    error: null,
  },
};

jest.mock('../src/components/Icon', () => {
  const MockIcon = () => null;
  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock('react-native-keyboard-manager', () => ({
  setEnable: jest.fn(),
  setKeyboardDistanceFromTextField: jest.fn(),
  setLayoutIfNeededOnUpdate: jest.fn(),
  setEnableAutoToolbar: jest.fn(),
  setToolbarDoneBarButtonItemText: jest.fn(),
  setToolbarManageBehaviourBy: jest.fn(),
  setToolbarPreviousNextButtonEnable: jest.fn(),
  setShouldShowToolbarPlaceholder: jest.fn(),
  setOverrideKeyboardAppearance: jest.fn(),
  setShouldResignOnTouchOutside: jest.fn(),
  setShouldPlayInputClicks: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: jest.fn(),
    }),
  };
});

jest.mock('../src/context/InventoryContext', () => ({
  useInventory: () => mockInventoryContext,
  InventoryProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
  useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
}));

// Navigation mock creator
const createEditItemMockNav = () => {
  const mockRoute = {
    key: 'EditItem-123',
    name: 'EditItem' as const,
    params: {
      item: mockItem,
    },
  } as EditItemProps['route'];

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  } as unknown as EditItemProps['navigation'];

  return {
    mockRoute,
    mockNavigation,
  };
};

const renderWithProviders = (ui: ReactElement) => {
  const Wrapper = ({children}: {children: ReactNode}) => (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <InventoryProvider>{children}</InventoryProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );

  return render(ui, {wrapper: Wrapper});
};

// Tests
describe('Screen Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match Home screen snapshot', async () => {
    const {toJSON} = renderWithProviders(<Home />);
    await waitFor(() => expect(toJSON()).toMatchSnapshot());
  });

  it('should match AddItem screen snapshot', async () => {
    const {toJSON} = renderWithProviders(<AddItem />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should match EditItem screen snapshot', async () => {
    const {mockRoute, mockNavigation} = createEditItemMockNav();

    const {toJSON} = renderWithProviders(
      <EditItem route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

describe('Delete Confirmation', () => {
  it('should show confirmation dialog when delete button is pressed', async () => {
    const {mockRoute, mockNavigation} = createEditItemMockNav();

    const mockAlert = jest.spyOn(Alert, 'alert');
    const {getByText} = renderWithProviders(
      <EditItem route={mockRoute} navigation={mockNavigation} />,
    );

    const deleteButton = getByText('Delete Item');
    fireEvent.press(deleteButton);

    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith(
        'Delete Item',
        'Are you sure you want to delete this item?',
        expect.any(Array),
      ),
    );
  });
});

describe('Navigation Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to EditItem screen when pressing an item in the list', async () => {
    const {getByText} = renderWithProviders(<Home />);

    const itemElement = getByText(mockItem.name);
    fireEvent.press(itemElement);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('EditItem', {
        item: mockItem,
      });
    });
  });
});

describe('AsyncStorage operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
  });

  describe('CRUD Operations', () => {
    it('should get items from storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([mockItem]),
      );

      const items = await StorageService.getItems();

      expect(items).toEqual([mockItem]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@inventory_items');
    });

    it('should handle empty storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const items = await StorageService.getItems();

      expect(items).toEqual([]);
    });

    it('should add new item to storage', async () => {
      const newItem = {
        ...mockItem,
        id: '2',
        name: 'New Test Item',
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([mockItem]),
      );
      await StorageService.addItem(newItem);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@inventory_items',
        expect.stringContaining(newItem.name),
      );
    });

    it('should update existing item', async () => {
      const updatedItem = {
        ...mockItem,
        totalStock: '15',
        lastModified: new Date().toISOString(),
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([mockItem]),
      );
      await StorageService.updateItem(updatedItem);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@inventory_items',
        expect.stringContaining('15'),
      );
    });

    it('should delete item from storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([mockItem]),
      );
      await StorageService.deleteItem(mockItem.id);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@inventory_items',
        '[]',
      );
    });
  });

  describe('InventoryContext', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <InventoryProvider>{children}</InventoryProvider>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    beforeEach(() => {
      jest.clearAllMocks();
      (AsyncStorage.getItem as jest.Mock).mockImplementation(() =>
        Promise.resolve('[]'),
      );
      (AsyncStorage.setItem as jest.Mock).mockImplementation(() =>
        Promise.resolve(),
      );
    });

    it('should load initial items on mount', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify([mockItem])),
      );

      const {result, waitFor: hookWait} = renderHook(() => useInventory(), {
        wrapper,
      });

      await hookWait(
        () => {
          expect(result.current.state.items).toHaveLength(1);
        },
        {timeout: 2000},
      );

      expect(result.current.state.items[0]).toEqual(mockItem);
    });
  });
});
