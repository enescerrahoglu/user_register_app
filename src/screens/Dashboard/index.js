import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style';

const windowWidth = Dimensions.get('window').width;

const ProfileInformation = ({user, defaultImage}) => {
  return (
    <View
      style={{
        backgroundColor: '#ededed',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {user.profilePhoto ? (
          <Image source={{uri: user.profilePhoto}} style={styles.image} />
        ) : (
          <Image source={defaultImage} style={styles.image} />
        )}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
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
          borderWidth: 0.5,
          width: '100%',
          alignSelf: 'center',
          marginVertical: 10,
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

export const DashboardScreen = ({route, navigation}) => {
  const defaultImageSource = require('../../assets/default_profile_image.png');
  const {userData} = route.params;

  useEffect(() => {}, []);

  const user = JSON.parse(userData);

  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 1500,
      autoHide: true,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileInformation user={user} defaultImage={defaultImageSource} />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
