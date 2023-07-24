import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

export const ProfileScreen = ({route, navigation}) => {
  const countriesData = route.params.countries.map(country => ({
    label: country.name.common,
    value: country.cca3,
  }));

  const userData = route.params.userData;

  useEffect(() => {
    console.log('**********userData**********');
    console.log(userData);
    console.log('**********userData**********');

    setValue2(userData !== null ? userData.gender : null);
    setValue(userData !== null ? userData.country : null);
    setSelectedImage(userData !== null ? userData.profilePhoto : null);
    // setDate(userData !== null ? new Date(userData.dateOfBirth) : new Date());
  }, [userData]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const defaultImageSource = require('../../assets/default_profile_image.png');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(countriesData);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]);

  const [date, setDate] = useState(new Date());
  const [open3, setOpen3] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${
      month < 10 ? '0' + month : month
    }.${year}`;
  };

  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        const imageData = 'data:image/jpeg;base64,' + image.data;
        setSelectedImage(imageData);
      })
      .catch(error => {
        setSelectedImage(null);
      });
  };

  const saveProfile = async values => {
    const {firstName, lastName, phoneNumber} = values;
    const selectedCountry = items.find(item => item.value === value);
    const selectedGender = items2.find(item => item.value === value2);

    const idNumber = route.params.id;
    const data = {
      idNumber: idNumber,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      country: selectedCountry ? selectedCountry.value : '',
      gender: selectedGender ? selectedGender.value : '',
      dateOfBirth: date,
      profilePhoto: selectedImage,
    };

    try {
      const existingData = await AsyncStorage.getItem('@users');
      const parsedExistingData = existingData ? JSON.parse(existingData) : {};
      parsedExistingData[idNumber] = data;
      const savedData = JSON.stringify(parsedExistingData);
      await AsyncStorage.setItem('@users', savedData);
      showCustomToast('Success', 'success');
      console.log('Data saved to AsyncStorage with key:', idNumber);

      navigation.navigate('ProfileWorkStatusScreen', {
        userId: route.params.id,
        userData: userData,
      });
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.image_container}>
          <TouchableWithoutFeedback onPress={handleSelectImage}>
            {selectedImage ? (
              <Image source={{uri: selectedImage}} style={styles.image} />
            ) : (
              <Image source={defaultImageSource} style={styles.image} />
            )}
          </TouchableWithoutFeedback>
        </View>
        <Formik
          initialValues={{
            firstName: userData !== null ? userData.firstName : null,
            lastName: userData !== null ? userData.lastName : null,
            phoneNumber: userData !== null ? userData.phoneNumber : null,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async values => await saveProfile(values)}
          validate={values => {
            const errors = {};

            if (values.firstName == null) {
              errors.firstName = 'First name is required';
              showCustomToast(errors.firstName, 'error');
            } else if (!values.lastName) {
              errors.lastName = 'Last name is required';
              showCustomToast(errors.lastName, 'error');
            } else if (!values.phoneNumber) {
              errors.phoneNumber = 'Phone number is required';
              showCustomToast(errors.phoneNumber, 'error');
            } else if (value == null) {
              errors.country = 'Please select your country.';
              showCustomToast(errors.country, 'error');
            } else if (date == null) {
              errors.country = 'Please select date of birth.';
              showCustomToast(errors.country, 'error');
            } else if (value2 == null) {
              errors.country = 'Please select your gender.';
              showCustomToast(errors.country, 'error');
            } else if (toggleCheckBox == false) {
              errors.country = 'Please confirm the KVKK approval text.';
              showCustomToast(errors.country, 'error');
            }
            return errors;
          }}>
          {({handleChange, handleSubmit, values, errors, validateForm}) => (
            <>
              <TextInputComponent
                placeholder="ID Number"
                value={route.params.id}
                editable={false}
              />
              <TextInputComponent
                placeholder="First name"
                onChangeText={handleChange('firstName')}
                onBlur={() => validateForm()}
                value={values.firstName}
                error={errors.firstName}
                maxLength={20}
              />
              <TextInputComponent
                placeholder="Last name"
                onChangeText={handleChange('lastName')}
                onBlur={() => validateForm()}
                value={values.lastName}
                error={errors.lastName}
                maxLength={20}
              />
              <TextInputComponent
                placeholder="Phone number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={() => validateForm()}
                value={values.phoneNumber}
                error={errors.phoneNumber}
                keyboardType="number-pad"
              />
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onOpen={() => setOpen2(false)}
                listMode="SCROLLVIEW"
                placeholder="Country"
                style={styles.dropDownPicker}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                zIndex={2000}
                zIndexInverse={1000}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setOpen3(true)}>
                <TextInputComponent
                  placeholder="Date of birth"
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={() => validateForm()}
                  editable={false}
                  value={formatDate(date)}
                  error={errors.dateOfBirth}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open3}
                date={date}
                mode="date"
                onConfirm={date => {
                  setOpen3(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen3(false);
                }}
              />
              <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                onOpen={() => setOpen(false)}
                listMode="SCROLLVIEW"
                placeholder="Gender"
                style={styles.dropDownPicker}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                zIndex={1000}
                zIndexInverse={2000}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={{color: '#000'}}>KVKK approval text</Text>
              </View>
              <ButtonComponent
                title="Save"
                onPress={() => {
                  handleSubmit();
                  validateForm();
                }}
                marginBottom={10}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
