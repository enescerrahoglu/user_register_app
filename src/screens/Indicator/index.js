import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const IndicatorScreen = ({route, navigation}) => {
  var countries = null;
  var userData = null;
  useEffect(() => {
    getUserData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      countries = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    try {
      await fetchData();
      const data = await AsyncStorage.getItem('@users');
      if (data !== null) {
        const parsedData = JSON.parse(data);
        userData = parsedData[route.params.id];
        userData == undefined ? (userData = null) : null;
        if (userData !== null) {
          userData = JSON.stringify(userData);
          navigation.navigate('ProfileStack', {
            screen: 'DashboardScreen',
            params: {
              userData: userData,
            },
          });
        } else {
          userData = JSON.stringify(userData);
          navigation.navigate('ProfileStack', {
            screen: 'ProfileScreen',
            params: {
              countries: countries,
              id: route.params.id,
              userData: userData,
            },
          });
        }
      } else {
        userData == undefined ? (userData = null) : null;
        navigation.navigate('ProfileStack', {
          screen: 'ProfileScreen',
          params: {
            countries: countries,
            id: route.params.id,
            userData: userData,
          },
        });
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
