import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

export const ProfileCompetenceScreen = ({route, navigation}) => {
  const {userId, userData} = route.params;

  useEffect(() => {
    setValue(userData !== null ? userData.educationLevel : null);
  }, []);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Primary School', value: 'primarySchool'},
    {label: 'High School', value: 'highSchool'},
    {label: 'University', value: 'university'},
  ]);

  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  const updateUserCompetence = async (
    educationLevel,
    schoolName,
    departmentName,
    graduationYear,
  ) => {
    try {
      const data = await AsyncStorage.getItem('@users');
      if (data !== null) {
        const parsedData = JSON.parse(data);

        if (parsedData[userId]) {
          parsedData[userId].educationLevel = educationLevel;
          parsedData[userId].schoolName = schoolName;
          parsedData[userId].departmentName = departmentName;
          parsedData[userId].graduationYear = graduationYear;
        }

        const updatedData = JSON.stringify(parsedData);
        await AsyncStorage.setItem('@users', updatedData);

        // navigation.navigate('DashboardScreen', {
        //   userData: JSON.stringify(parsedData[userId]),
        // });

        // navigation.navigate('IndicatorStack', {
        //   screen: 'IndicatorScreen',
        //   params: {id: userId},
        // });

        navigateToIndicatorScreen();
      }
    } catch (error) {
      console.log('Error updating user data in AsyncStorage:', error);
    }
  };

  const saveCompetence = async values => {
    const selectedEducationLevel = value;
    const {schoolName, departmentName, graduationYear} = values;
    console.log(selectedEducationLevel);
    console.log(schoolName);
    console.log(departmentName);
    console.log(graduationYear);

    try {
      updateUserCompetence(
        selectedEducationLevel,
        schoolName,
        departmentName,
        graduationYear,
      );
      showCustomToast('Success', 'success');
      console.log('Data saved to AsyncStorage with key:', userId);
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  const navigateToIndicatorScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'IndicatorScreen', params: {id: userId}}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Formik
          initialValues={{
            schoolName: '',
            departmentName: '',
            graduationYear: '',
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async values => await saveCompetence(values)}
          validate={values => {
            const errors = {};
            if (value == null) {
              errors.value = 'Please select your education level.';
              showCustomToast(errors.value, 'error');
            } else if (values.schoolName == '') {
              errors.schoolName = 'School Name is required';
              showCustomToast(errors.schoolName, 'error');
            } else if (values.departmentName == '') {
              errors.departmentName = 'Department Name is required';
              showCustomToast(errors.departmentName, 'error');
            } else if (values.graduationYear == '') {
              errors.graduationYear = 'Graduation Year is required';
              showCustomToast(errors.graduationYear, 'error');
            }
            return errors;
          }}>
          {({handleChange, handleSubmit, values, errors, validateForm}) => (
            <>
              <TextInputComponent
                placeholder="ID"
                value={userId}
                editable={false}
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
                placeholder="Education Level"
                style={styles.dropDownPicker}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                zIndex={2000}
                zIndexInverse={1000}
              />
              <TextInputComponent
                placeholder="School Name"
                onChangeText={handleChange('schoolName')}
                onBlur={() => validateForm()}
                value={values.schoolName}
                error={errors.schoolName}
              />
              <TextInputComponent
                placeholder="Department Name"
                onChangeText={handleChange('departmentName')}
                onBlur={() => validateForm()}
                value={values.departmentName}
                error={errors.departmentName}
              />
              <TextInputComponent
                placeholder="Graduation Year"
                onChangeText={handleChange('graduationYear')}
                onBlur={() => validateForm()}
                value={values.graduationYear}
                error={errors.graduationYear}
                maxLength={4}
                keyboardType="number-pad"
              />
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
