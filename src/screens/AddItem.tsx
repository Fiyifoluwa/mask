import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useInventory} from '../context/InventoryContext';
import {InventoryForm} from '../components/InventoryForm';
import {InventoryItem} from '../types';
import LayoutContainer from '../components/LayoutContainer';
import Toast from 'react-native-toast-message';

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
      totalStock: values.totalStock!,
      price: values.price!,
      description: values.description!,
      lastModified: new Date().toISOString(),
    };

    await addItem(newItem);
    navigation.goBack();
  };

  const handleContinueAndAdd = async (values: Partial<InventoryItem>) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: values.name!,
      totalStock: values.totalStock!,
      price: values.price!,
      description: values.description!,
      lastModified: new Date().toISOString(),
    };

    await addItem(newItem).then(() => {
      Toast.show({
        type: 'successToast',
        props: {
          text: 'Item added successfully',
        },
      });
    });
  };

  return (
    <LayoutContainer
      backgroundColor="background"
      header
      headerText="Add Item"
      subHeader="Add a new item to your inventory">
      <InventoryForm
        initialValues={{
          name: '',
          totalStock: '',
          price: '',
          description: '',
        }}
        onSubmit={handleSubmit}
        submitButtonText="Add Item"
        existingItems={items}
        onContinueAndAdd={handleContinueAndAdd}
      />
    </LayoutContainer>
  );
};
