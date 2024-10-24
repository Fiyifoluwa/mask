import React from 'react';
import {View, Button, Alert, StyleSheet} from 'react-native';
import {useInventory} from '../context/InventoryContext';
import {InventoryForm} from '../components/InventoryForm';
import {InventoryItem} from '../types';
import {AppStackScreenProps} from '../navigation/types';
import LayoutContainer from '../components/LayoutContainer';

type Props = AppStackScreenProps<'EditItem'>;

export const EditItem = ({route, navigation}: Props) => {
  const {
    updateItem,
    deleteItem,
    state: {items},
  } = useInventory();
  const currentItem: InventoryItem = route.params.item;

  const handleSubmit = async (values: Partial<InventoryItem>) => {
    const updatedItem: InventoryItem = {
      ...currentItem,
      ...values,
    };

    await updateItem(updatedItem);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteItem(currentItem.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <LayoutContainer
      backgroundColor="background"
      header
      headerText="Edit Item"
      subHeader="Edit the details of this item">
      <View style={styles.container}>
        <InventoryForm
          initialValues={currentItem}
          onSubmit={handleSubmit}
          submitButtonText="Update Item"
          existingItems={items}
        />
        <View style={styles.deleteButtonContainer}>
          <Button title="Delete Item" onPress={handleDelete} color="red" />
        </View>
      </View>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButtonContainer: {
    marginTop: 16,
  },
});
