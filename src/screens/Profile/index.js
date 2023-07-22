import React, {useState} from 'react';
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
import styles from './style';

export const ProfileScreen = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleLogin = values => {
    showCustomToast('Login successful', 'success');
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage(image.path);
      })
      .catch(error => {
        setSelectedImage(null);
      });
  };
  const defaultImageSource = require('../../assets/default_profile_image.png');

  const countriesData = route.params.countries.map(country => ({
    label: country.name.official,
    value: country.cca3,
  }));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(countriesData);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Woman', value: 'woman'},
    {label: 'Man', value: 'man'},
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

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
          initialValues={{firstName: '', lastName: ''}}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={values => handleLogin(values)}
          validate={values => {
            const errors = {};
            if (!values.firstName) {
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
                placeholder="ID"
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
                listMode="SCROLLVIEW"
                placeholder="Country"
                style={styles.dropDownPicker}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                }}
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
                listMode="SCROLLVIEW"
                placeholder="Gender"
                style={styles.dropDownPicker}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                }}
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
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
