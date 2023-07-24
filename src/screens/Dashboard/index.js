import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style';
import ProfileInfo from '../../components/ProfileInfo';
import ProjectContainer from '../../components/ProjectContainer';

export const DashboardScreen = ({route, navigation}) => {
  const {userData, projects} = route.params;

  useEffect(() => {}, []);

  const user = JSON.parse(userData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileInfo user={user} />
        <Text style={{marginTop: 20, color: '#132143'}}>Projects</Text>
        {projects.map((project, index) => (
          <ProjectContainer key={index} project={project} />
        ))}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
