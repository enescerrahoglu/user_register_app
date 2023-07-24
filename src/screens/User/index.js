import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import styles from './style';

export const UserScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Image
          style={styles.image}
          source={require('../../assets/person.png')}
        />
      </View>
    </View>
  );
};
