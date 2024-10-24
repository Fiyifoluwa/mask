import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryItem} from '../types';

const STORAGE_KEY = '@inventory_items';

export const StorageService = {
  async getItems(): Promise<InventoryItem[]> {
    const items = await AsyncStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  },

  async saveItems(items: InventoryItem[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  async addItem(item: InventoryItem): Promise<void> {
    const items = await this.getItems();
    items.push(item);
    await this.saveItems(items);
  },

  async updateItem(updatedItem: InventoryItem): Promise<void> {
    const items = await this.getItems();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      await this.saveItems(items);
    }
  },

  async deleteItem(id: string): Promise<void> {
    const items = await this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    await this.saveItems(filteredItems);
  },
};
