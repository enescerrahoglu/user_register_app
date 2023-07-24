import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import UserProfile from '../../components/UserProfile';
import styles from './style';

export const UserScreen = ({route}) => {
  const {userData} = route.params;
  const user = JSON.parse(userData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <UserProfile user={user} />
      </ScrollView>
    </SafeAreaView>
  );
};
