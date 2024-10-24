import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
  ReactNode,
  FC,
} from 'react';
import {StorageService} from '../utils/storage';
import {InventoryAction, InventoryItem, InventoryState} from '../types';

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

const InventoryContext = createContext<
  | {
      state: InventoryState;
      dispatch: Dispatch<InventoryAction>;
      loadItems: () => Promise<void>;
      addItem: (item: InventoryItem) => Promise<void>;
      updateItem: (item: InventoryItem) => Promise<void>;
      deleteItem: (id: string) => Promise<void>;
    }
  | undefined
>(undefined);

const inventoryReducer = (
  state: InventoryState,
  action: InventoryAction,
): InventoryState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const InventoryProvider: FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const loadItems = async () => {
    try {
      const items = await StorageService.getItems();
      dispatch({type: 'SET_ITEMS', payload: items});
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const addItem = async (item: InventoryItem) => {
    try {
      await StorageService.addItem(item);
      dispatch({type: 'ADD_ITEM', payload: item});
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (item: InventoryItem) => {
    try {
      await StorageService.updateItem(item);
      dispatch({type: 'UPDATE_ITEM', payload: item});
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await StorageService.deleteItem(id);
      dispatch({type: 'DELETE_ITEM', payload: id});
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        state,
        dispatch,
        loadItems,
        addItem,
        updateItem,
        deleteItem,
      }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
