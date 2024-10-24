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
    totalStock: Yup.number()
      .required('Total stock is required')
      .min(0, 'Stock cannot be negative')
      .typeError('Total stock must be a number'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price cannot be negative')
      .typeError('Price must be a number'),
    description: Yup.string()
      .required('Description is required')
      .test(
        'word-count',
        'Description must have at least three words',
        value => (value?.trim().split(/\s+/).length ?? 0) >= 3,
      ),
  });
