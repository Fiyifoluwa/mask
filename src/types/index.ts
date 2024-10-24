export interface InventoryItem {
  id: string;
  name: string;
  totalStock: string;
  price: string;
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

export const regexPatterns = {
  // Alphanumeric (letters and numbers)
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  // Numbers (digits 0-9)
  NUMBER: /^\d+$/,
  // Special regex for name fields
  NAME_FIELD: /^[a-zA-Z\-']+$/,
  // Alphabets (letters a-z and A-Z)
  ALPHABET: /^[a-zA-Z]+$/,
  // No whitespace (no spaces, tabs, newlines, etc.)
  NO_WHITESPACE: /^[^\s]+$/,
  // Special characters (any character that is not a letter, number, or whitespace)
  SPECIAL_CHARACTERS: /^[^a-zA-Z0-9\s]+$/,
  // Text and spaces
  TEXT_WITH_SPACE: /^[a-zA-Z0-9\s]+$/,
  // Alphanumeric (letters, numbers, and spaces)
  ALPHANUMERIC_WITH_SPACE: /^[a-zA-Z0-9\s]+$/,
  // Alphanumeric (letters, numbers, spaces, hyphens, apostrophes and ampersands)
  ALPHANUMERIC_WITH_SPACE_AND_SPECIAL_XTERS: /^[a-zA-Z0-9\s\-&\u0027]+$/,
};
