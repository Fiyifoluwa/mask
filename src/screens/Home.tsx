import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useInventory} from '../context/InventoryContext';
import {InventoryItem} from '../types';

export const Home = () => {
  const {
    state: {items},
  } = useInventory();
  const navigation = useNavigation();

  const renderItem = ({item}: {item: InventoryItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('EditItem', {item})}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Stock: {item.totalStock}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in inventory</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem')}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  deleteButtonContainer: {
    marginTop: 16,
  },
});
