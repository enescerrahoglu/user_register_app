import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

export const ProfileWorkStatusScreen = ({route, navigation}) => {
  const {userId, userData} = route.params;

  useEffect(() => {
    setValue(userData !== null ? userData.workStatus : null);
  }, []);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Student', value: 'student'},
    {label: 'Worker', value: 'worker'},
    {label: 'Jobless', value: 'jobless'},
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

  const updateWorkStatus = async (workStatus, job) => {
    try {
      const data = await AsyncStorage.getItem('@users');
      if (data !== null) {
        const parsedData = JSON.parse(data);

        if (parsedData[userId]) {
          parsedData[userId].workStatus = workStatus;
          parsedData[userId].job = job;
        }

        const updatedData = JSON.stringify(parsedData);
        await AsyncStorage.setItem('@users', updatedData);
        console.log('PARSED DATA:', parsedData);

        navigation.navigate('ProfileCompetenceScreen', {
          userId: userId,
          userData: updatedData,
        });
      }
    } catch (error) {
      console.log('Error updating user data in AsyncStorage:', error);
    }
  };

  const saveWorkStatus = async values => {
    const {job} = values;
    const selectedWorkStatus = value;
    try {
      updateWorkStatus(selectedWorkStatus, job);
      showCustomToast('Success', 'success');
      console.log('Data saved to AsyncStorage with key:', userId);
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Formik
          initialValues={{
            job: userData !== null ? userData.job : null,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async values => await saveWorkStatus(values)}
          validate={values => {
            const errors = {};
            if (value == null) {
              errors.value = 'Please select your work status.';
              showCustomToast(errors.value, 'error');
            } else if (values.job == '') {
              errors.job = 'Job is required';
              showCustomToast(errors.job, 'error');
            }
            return errors;
          }}>
          {({handleChange, handleSubmit, values, errors, validateForm}) => (
            <>
              <TextInputComponent
                placeholder="ID Number"
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
                placeholder="Work Status"
                style={styles.dropDownPicker}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                zIndex={2000}
                zIndexInverse={1000}
              />
              <TextInputComponent
                placeholder="Job"
                onChangeText={handleChange('job')}
                onBlur={() => validateForm()}
                value={values.job}
                error={errors.job}
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
