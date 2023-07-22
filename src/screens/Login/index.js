import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';

export const LoginScreen = ({navigation}) => {
  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  const handleLogin = values => {
    showCustomToast('Login successful', 'success');
    navigation.navigate('IndicatorStack', {
      screen: 'IndicatorScreen',
      params: {id: values.id},
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Image
          style={styles.image}
          source={require('../../assets/identity.png')}
        />
        <Formik
          initialValues={{id: ''}}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={values => handleLogin(values)}
          validate={values => {
            const errors = {};
            if (!values.id) {
              errors.id = 'ID is required!';
              showCustomToast(errors.id, 'error');
            } else if (values.id.length != 11) {
              errors.id = 'ID value must consist of 11 digits!';
              showCustomToast(errors.id, 'error');
            }
            return errors;
          }}>
          {({handleChange, handleSubmit, values, errors, validateForm}) => (
            <>
              <TextInputComponent
                placeholder="ID"
                onChangeText={handleChange('id')}
                onBlur={() => validateForm()}
                value={values.id}
                error={errors.id}
                keyboardType="number-pad"
                fontSize={20}
                maxLength={11}
              />
              <ButtonComponent
                title="Login"
                onPress={() => {
                  handleSubmit();
                  validateForm();
                }}
              />
            </>
          )}
        </Formik>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  inputView: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
