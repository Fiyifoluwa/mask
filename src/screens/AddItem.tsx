import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useInventory} from '../context/InventoryContext';
import {InventoryForm} from '../components/InventoryForm';
import {InventoryItem} from '../types';

export const AddItem = () => {
  const navigation = useNavigation();
  const {
    addItem,
    state: {items},
  } = useInventory();

  const handleSubmit = async (values: Partial<InventoryItem>) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: values.name!,
      totalStock: Number(values.totalStock),
      price: Number(values.price),
      description: values.description!,
    };

    await addItem(newItem);
    navigation.goBack();
  };

  return (
    <InventoryForm
      initialValues={{
        name: '',
        totalStock: 0,
        price: 0,
        description: '',
      }}
      onSubmit={handleSubmit}
      submitButtonText="Add Item"
      existingItems={items}
    />
  );
};
