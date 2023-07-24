import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const defaultImageSource = require('../assets/default_profile_image.png');
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

const ProfileInfo = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {user.profilePhoto ? (
          <Image source={{uri: user.profilePhoto}} style={styles.image} />
        ) : (
          <Image source={defaultImageSource} style={styles.image} />
        )}
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#132143'}}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={{fontSize: 14, color: '#424d69'}}>
            {user.phoneNumber}
          </Text>
          <Text style={{fontSize: 14, color: '#424d69'}}>
            {formatDate(user.dateOfBirth)}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#424d69'}}>
          {user.workStatus}
        </Text>
        <Text style={{fontSize: 18, color: '#717a8e'}}> ({user.job})</Text>
      </View>

      <View
        style={{
          borderWidth: 0.2,
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
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#424d69'}}>
            {user.schoolName}
          </Text>
          <Text style={{fontSize: 16, color: '#717a8e'}}>
            {' '}
            ({user.educationLevel})
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#424d69'}}>
            {user.departmentName}
          </Text>
          <Text style={{fontSize: 16, color: '#717a8e'}}>
            {' '}
            ({user.graduationYear})
          </Text>
        </View>
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
  },
  informationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default ProfileInfo;
