import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style';
import ProfileInfo from '../../components/ProfileInfo';
import ProjectContainer from '../../components/ProjectContainer';
import ProjectContext from '../../provider/ProjectContext';

export const DashboardScreen = ({route}) => {
  const {userData} = route.params;

  useEffect(() => {}, []);

  const user = JSON.parse(userData);
  const {projects} = useContext(ProjectContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileInfo user={user} />
        <Text style={{marginTop: 20, color: '#132143'}}>Projects</Text>
        {projects.map((project, index) => (
          <ProjectContainer key={index} project={project} />
        ))}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
