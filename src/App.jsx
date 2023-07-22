import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './navigation/app-stack';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
