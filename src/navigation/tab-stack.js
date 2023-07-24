import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabScreen} from '../screens';

const Stack = createNativeStackNavigator();

const TabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabScreen" component={TabScreen} />
    </Stack.Navigator>
  );
};

export default TabStack;
