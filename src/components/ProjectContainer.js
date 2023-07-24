import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const ProjectContainer = ({project}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#424d69'}}>
          {project.name}
        </Text>
        <Text style={{fontSize: 18}}></Text>
      </View>

      <View
        style={{
          borderWidth: 0.3,
          width: '100%',
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: '#424d69',
        }}
      />

      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 14, color: '#424d69'}}>
          {project.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7e9ec',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default ProjectContainer;
