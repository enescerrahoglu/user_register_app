import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IndicatorScreen} from '../screens';

const Stack = createNativeStackNavigator();

const IndicatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IndicatorScreen" component={IndicatorScreen} />
    </Stack.Navigator>
  );
};

export default IndicatorStack;
