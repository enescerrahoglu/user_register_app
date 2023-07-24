import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style';
import ProfileInfo from '../../components/ProfileInfo';
import ProjectContainer from '../../components/ProjectContainer';
import ProjectContext from '../../provider/ProjectContext';

export const DashboardScreen = ({route}) => {
  useEffect(() => {}, []);
  const {userData} = route.params;
  const user = JSON.parse(userData);
  const {projects, deleteProject} = useContext(ProjectContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileInfo user={user} />
        <Text style={{marginTop: 20, color: '#132143'}}>Projects</Text>
        {projects.map((project, index) => (
          <ProjectContainer
            key={index}
            project={project}
            onPress={() => {
              console.log(index);
              try {
                deleteProject(index);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        ))}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
