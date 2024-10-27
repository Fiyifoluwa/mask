import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {AddItem} from '../screens/AddItem';
import {EditItem} from '../screens/EditItem';
import {AppStackParamList} from './types';
import {navigationRef} from '../components/Header';

const Stack = createStackNavigator<AppStackParamList>();

export const modalOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{...modalOptions}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{...modalOptions}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
