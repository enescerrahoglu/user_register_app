import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

const ProjectContainer = ({project, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#424d69'}}>
          {project.name}
        </Text>

        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Image
            source={require('../assets/trash.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
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
