import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryProvider} from '../src/context/InventoryContext';
import {Home} from '../src/screens/Home';
import {AddItem} from '../src/screens/AddItem';
import {EditItem} from '../src/screens/EditItem';
import {Alert} from 'react-native';
import {StorageService} from '../src/utils/storage';
import {AppStackScreenProps} from '../src/navigation/types';

type EditItemProps = AppStackScreenProps<'EditItem'>;

const createEditItemMockNav = () => {
  const mockRoute = {
    key: 'EditItem-123',
    name: 'EditItem' as const,
    params: {
      item: {
        id: '1',
        name: 'Test Item',
        totalStock: 10,
        price: 99.99,
        description: 'Test description for item',
      },
    },
  } as EditItemProps['route'];

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as EditItemProps['navigation'];

  return {
    mockRoute,
    mockNavigation,
  };
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

const mockItem = {
  id: '1',
  name: 'Test Item',
  totalStock: 10,
  price: 99.99,
  description: 'This is a test item description',
};

describe('Screen Snapshots', () => {
  it('should match Home screen snapshot', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <InventoryProvider>
          <Home />
        </InventoryProvider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should match AddItem screen snapshot', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <InventoryProvider>
          <AddItem />
        </InventoryProvider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should match EditItem screen snapshot', () => {
    const mockRoute = createEditItemMockNav();

    const {toJSON} = render(
      <NavigationContainer>
        <InventoryProvider>
          <EditItem
            route={mockRoute.mockRoute}
            navigation={mockRoute.mockNavigation}
          />
        </InventoryProvider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Delete Confirmation', () => {
  it('should show confirmation dialog when delete button is pressed', async () => {
    const mockRoute = createEditItemMockNav();

    const mockAlert = jest.spyOn(Alert, 'alert');
    const {getByText} = render(
      <NavigationContainer>
        <InventoryProvider>
          <EditItem
            route={mockRoute.mockRoute}
            navigation={mockRoute.mockNavigation}
          />
        </InventoryProvider>
      </NavigationContainer>,
    );

    const deleteButton = getByText('Delete Item');
    fireEvent.press(deleteButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'Delete Item',
      'Are you sure you want to delete this item?',
      expect.any(Array),
    );
  });
});

describe('Navigation Tests', () => {
  it('should navigate to EditItem screen when pressing an item in the list', () => {
    const navigation = {navigate: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
        <InventoryProvider>
          <Home />
        </InventoryProvider>
      </NavigationContainer>,
    );

    const itemElement = getByText(mockItem.name);
    fireEvent.press(itemElement);

    expect(navigation.navigate).toHaveBeenCalledWith('EditItem', {
      item: mockItem,
    });
  });
});

describe('AsyncStorage CRUD Operations', () => {
  beforeEach(() => {
    mockedAsyncStorage.getItem.mockClear();
    mockedAsyncStorage.setItem.mockClear();
    mockedAsyncStorage.removeItem.mockClear();
  });

  it('should create an item in storage', async () => {
    await StorageService.addItem(mockItem);
    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      'inventory',
      expect.any(String),
    );
  });

  it('should retrieve items from storage', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockItem]));
    const items = await StorageService.getItems();
    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith('inventory');
    expect(items).toEqual([mockItem]);
  });

  it('should update an item in storage', async () => {
    const updatedItem = {...mockItem, name: 'Updated Test Item'};
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockItem]));
    await StorageService.updateItem(updatedItem);
    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      'inventory',
      expect.stringContaining('Updated Test Item'),
    );
  });

  it('should delete an item from storage', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockItem]));
    await StorageService.deleteItem(mockItem.id);
    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      'inventory',
      expect.stringMatching(/^\[\]$/),
    );
  });
});

// Test form validation
describe('Form Validation', () => {
  it('should validate required fields in AddItem form', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <InventoryProvider>
          <AddItem />
        </InventoryProvider>
      </NavigationContainer>,
    );

    const submitButton = getByText('Add Item');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Total stock is required')).toBeTruthy();
      expect(getByText('Price is required')).toBeTruthy();
      expect(
        getByText('Description must have at least three words'),
      ).toBeTruthy();
    });
  });

  it('should validate unique name constraint', async () => {
    const existingItems = [mockItem];
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <InventoryProvider>
          <AddItem />
        </InventoryProvider>
      </NavigationContainer>,
    );

    const nameInput = getByPlaceholderText('Item Name');
    fireEvent.changeText(nameInput, mockItem.name);

    await waitFor(() => {
      expect(getByText('Item name must be unique')).toBeTruthy();
    });
  });
});
