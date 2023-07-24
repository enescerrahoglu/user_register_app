import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const defaultImageSource = require('../assets/default_profile_image.png');
const ProfileInfo = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {user.profilePhoto ? (
          <Image source={{uri: user.profilePhoto}} style={styles.image} />
        ) : (
          <Image source={defaultImageSource} style={styles.image} />
        )}
        <View style={styles.informationContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#132143'}}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={{fontSize: 14}}>{user.phoneNumber}</Text>
          <Text style={{fontSize: 14}}>{user.dateOfBirth}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {user.workStatus}
        </Text>
        <Text style={{fontSize: 18}}> ({user.job}) </Text>
      </View>

      <View
        style={{
          borderWidth: 0.2,
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
        <Text>
          {user.schoolName} ({user.educationLevel})
        </Text>
        <Text>
          {user.departmentName} ({user.graduationYear})
        </Text>
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

export default ProfileInfo;
