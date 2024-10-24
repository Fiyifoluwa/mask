export interface InventoryItem {
  id: string;
  name: string;
  totalStock: number;
  price: number;
  description: string;
}

export type InventoryAction =
  | {type: 'SET_ITEMS'; payload: InventoryItem[]}
  | {type: 'ADD_ITEM'; payload: InventoryItem}
  | {type: 'UPDATE_ITEM'; payload: InventoryItem}
  | {type: 'DELETE_ITEM'; payload: string};

export interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
}
