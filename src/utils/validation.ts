import {InventoryItem} from '../types';
import * as Yup from 'yup';

export const inventoryItemSchema = (existingItems: InventoryItem[]) =>
  Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .test('unique', 'Item name already exists', function (value) {
        if (!value) {
          return false;
        }

        const currentId = this.parent.id;

        const nameExists = existingItems.some(
          item =>
            item.name.toLowerCase() === value.toLowerCase() &&
            item.id !== currentId,
        );

        return !nameExists;
      }),
    totalStock: Yup.string()
      .required('Total stock is required')
      .test('is-positive', 'Stock cannot be negative', value => {
        const number = Number(value);
        return number >= 0;
      }),
    price: Yup.string()
      .required('Price is required')
      .test('is-positive', 'Price cannot be negative', value => {
        const number = Number(value);
        return number >= 0;
      }),
    description: Yup.string()
      .required('Description is required')
      .test(
        'word-count',
        'Description must have at least three words',
        value => (value?.trim().split(/\s+/).length ?? 0) >= 3,
      ),
  });
