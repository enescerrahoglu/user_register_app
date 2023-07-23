import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProfileScreen,
  ProfileCompetenceScreen,
  ProfileWorkStatusScreen,
  DashboardScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        options={{
          title: 'Work Status',
          headerShown: true,
        }}
        name="ProfileWorkStatusScreen"
        component={ProfileWorkStatusScreen}
      />
      <Stack.Screen
        options={{
          title: 'Competence',
          headerShown: true,
        }}
        name="ProfileCompetenceScreen"
        component={ProfileCompetenceScreen}
      />
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerShown: true,
          headerBackVisible: false,
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
