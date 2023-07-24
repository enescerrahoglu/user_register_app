import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const ProjectContainer = ({project}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{project.name}</Text>
        <Text style={{fontSize: 18}}></Text>
      </View>

      <View
        style={{
          borderWidth: 0.5,
          width: '100%',
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: '#a1a6b4',
        }}
      />

      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text>{project.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 1000,
    overflow: 'hidden',
    borderColor: '#0079ff',
  },
  container: {
    backgroundColor: '#e7e9ec',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default ProjectContainer;
