import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './navigation/app-stack';
import {ProjectProvider} from '../src/provider/ProjectContext';

export default function App() {
  return (
    <ProjectProvider>
      <SafeAreaView style={styles.container}>
        <AppStack />
      </SafeAreaView>
    </ProjectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
