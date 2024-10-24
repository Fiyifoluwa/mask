import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useInventory} from '../context/InventoryContext';
import {InventoryItem} from '../types';
import LayoutContainer from '../components/LayoutContainer';
import {formatAmount} from '../utils/functions';
import {TextInputWithoutFormik} from '../components/Input';
import Icon from '../components/Icon';
import {useTheme} from '../theme';
import {heightPixel} from '../utils/responsiveDimensions';
import {filter} from 'lodash';
import Box from '../components/Box';
import Text from '../components/Text';
import Pressable from '../components/Pressable';

export const Home = () => {
  const {
    state: {items},
  } = useInventory();
  const navigation = useNavigation();
  const [searchTerm, setSearhTerm] = useState('');
  const {colors} = useTheme();

  const renderItem = ({item}: {item: InventoryItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('EditItem', {item})}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Stock: {item.totalStock}</Text>
      <Text>Price: {formatAmount(item.price)}</Text>
    </TouchableOpacity>
  );

  const filteredItems = filter(items, item => {
    const searchTermLower = searchTerm.toLowerCase();
    const itemNameLower = item.name.toLowerCase();
    const itemDescriptionLower = item.description.toLowerCase();
    return (
      itemNameLower.includes(searchTermLower) ||
      itemDescriptionLower.includes(searchTermLower)
    );
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LayoutContainer
          headerText="Inventory"
          subHeader="Manage your inventory"
          showBackButton={false}>
          <View style={styles.container}>
            {items.length > 0 && (
              <TextInputWithoutFormik
                hideLabel
                leftComponent={<Icon name="Search" size="smh" />}
                label="Search"
                name="search"
                placeholder={'Search Inventory'}
                value={searchTerm}
                onChangeText={text => setSearhTerm(text)}
                addedContainerStyle={{
                  backgroundColor: colors.fainterGrey,
                }}
                outerContainerStyle={{
                  marginTop: heightPixel(16),
                }}
              />
            )}

            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Box alignSelf="center" alignItems="center" mt="xxxl">
                  <Text mt="m" textAlign="center">
                    {searchTerm
                      ? `There are no items with "${searchTerm}".`
                      : 'No items in your inventory. \nStart adding items to get started'}
                  </Text>

                  <Pressable
                    onPress={() => navigation.navigate('AddItem')}
                    px="ll"
                    py="sml"
                    bg="primary"
                    mt="m"
                    borderRadius="xl">
                    <Text color="white" variant="buttonLabel">
                      Add a new item
                    </Text>
                  </Pressable>
                </Box>
              }
            />
            {items.length > 0 && (
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('AddItem')}>
                  <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LayoutContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
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
  addButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    backgroundColor: 'transparent',
    maxWidth: '50%',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center', // Center the text
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
