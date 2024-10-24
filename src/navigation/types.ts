import {StackScreenProps} from '@react-navigation/stack';
import {InventoryItem} from '../types';
import {NavigationProp} from '@react-navigation/native';

export type AppStackParamList = {
  AddItem: undefined;
  EditItem: {
    item: InventoryItem;
  };
  Home: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export type AppStackNavigationType = NavigationProp<AppStackParamList>;
