import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileStack from './profile-stack';
import IndicatorStack from './indicator-stack';
import LoginStack from './login-stack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="IndicatorStack" component={IndicatorStack} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
        <Stack.Screen name="LoginStack" component={LoginStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
