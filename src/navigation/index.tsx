import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {AddItem} from '../screens/AddItem';
import {EditItem} from '../screens/EditItem';
import {AppStackParamList} from './types';

const Stack = createStackNavigator<AppStackParamList>();

export const modalOptions = {
  presentation: 'modal',
  gestureEnabled: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Inventory'}}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{title: 'Add New Item', ...modalOptions}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{title: 'Edit Item', ...modalOptions}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
