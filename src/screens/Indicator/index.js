import React, {useEffect, useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCountries, fetchProjects} from '../../services/apiService';
import ProjectContext from '../../provider/ProjectContext';

export const IndicatorScreen = ({route, navigation}) => {
  var countries = null;
  var userData = null;

  const {projects, setProjects} = useContext(ProjectContext);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const fetchedCountries = await fetchCountries();
      countries = fetchedCountries;
      const fetchedProjects = await fetchProjects();
      {
        fetchedProjects.projects.map(project =>
          setProjects(prevProjects => [...prevProjects, project]),
        );
      }

      const data = await AsyncStorage.getItem('@users');
      if (data !== null) {
        const parsedData = JSON.parse(data);
        userData = parsedData[route.params.id];
        userData == undefined ? (userData = null) : null;
        console.log(userData);
        if (userData !== null) {
          userData = JSON.stringify(userData);
          navigation.navigate('ProfileStack', {
            screen: 'TabScreen',
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
