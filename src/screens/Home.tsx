import React, {useState} from 'react';
import {
  FlatList,
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
import {TextInputWithoutFormik} from '../components/Input';
import Icon from '../components/Icon';
import {useTheme} from '../theme';
import {heightPixel} from '../utils/responsiveDimensions';
import {filter} from 'lodash';
import Box from '../components/Box';
import Text from '../components/Text';
import Pressable from '../components/Pressable';
import InventoryCard from '../components/InventoryCard';
import {Palette} from '../theme/palette';

const ItemSeparatorComponent = () => (
  <Box height={heightPixel(1)} my="s" bg="segmentBorderColor" />
);

const ListEmptyComponent = ({navigation, searchTerm, itemsLength}: any) => (
  <Box alignSelf="center" alignItems="center" mt="xxxl">
    <Text mt="m" textAlign="center">
      {searchTerm
        ? `There are no items with "${searchTerm}".`
        : 'No items in your inventory. \nStart adding items to get started'}
    </Text>

    {itemsLength < 1 && (
      <Pressable
        onPress={() => navigation.navigate('AddItem')}
        px="ll"
        py="sml"
        bg="primary"
        mt="xxl"
        borderRadius="xl">
        <Text color="white" variant="buttonLabel">
          Add a new item
        </Text>
      </Pressable>
    )}
  </Box>
);

export const Home = () => {
  const {
    state: {items},
  } = useInventory();
  const navigation = useNavigation();
  const [searchTerm, setSearhTerm] = useState('');
  const {colors} = useTheme();

  const renderItem = ({item}: {item: InventoryItem}) => (
    <InventoryCard
      item={item}
      onItemPress={() => navigation.navigate('EditItem', {item})}
    />
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
    <LayoutContainer
      headerText="Inventory"
      subHeader="Manage your inventory"
      showBackButton={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} gap="m">
            {items.length > 0 && (
              <Box mt="m" px="m">
                <TextInputWithoutFormik
                  hideLabel
                  leftComponent={<Icon name="Search" size="smh" />}
                  label="Search"
                  name="search"
                  autoCapitalize="none"
                  placeholder={'Search Inventory...'}
                  value={searchTerm}
                  onChangeText={text => setSearhTerm(text)}
                  addedContainerStyle={{
                    backgroundColor: colors.fainterGrey,
                  }}
                />
              </Box>
            )}

            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              keyboardShouldPersistTaps="handled"
              ItemSeparatorComponent={ItemSeparatorComponent}
              ListEmptyComponent={
                <ListEmptyComponent
                  navigation={navigation}
                  searchTerm={searchTerm}
                  itemsLength={items.length}
                />
              }
            />

            {items.length > 0 && (
              <Box style={styles.addButtonContainer}>
                <Pressable
                  style={styles.addButton}
                  onPress={() => navigation.navigate('AddItem')}
                  bg="primary"
                  p="s">
                  <Icon name="Plus" size="xxl" />
                </Pressable>
              </Box>
            )}
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  addButtonContainer: {
    position: 'absolute',
    right: 16,
    bottom: Platform.OS === 'ios' ? 20 : 16,
    backgroundColor: 'transparent',
  },
  addButton: {
    borderRadius: 30,
    elevation: 4,
    shadowColor: Palette.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
