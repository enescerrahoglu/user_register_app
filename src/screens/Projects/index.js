import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import styles from './style';
import ProjectContext from '../../provider/ProjectContext';
import ProjectContainer from '../../components/ProjectContainer';

export const ProjectsScreen = ({route}) => {
  const {userData} = route.params;
  const {projects, setProjects, deleteProject} = useContext(ProjectContext);

  useEffect(() => {}, []);

  const showCustomToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  const addProject = async (projectName, description) => {
    const newProject = {
      name: projectName,
      description: description,
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const saveProject = async values => {
    const {projectName, description} = values;
    try {
      addProject(projectName, description);
      values.projectName = '';
      values.description = '';
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
          initialValues={{}}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async values => await saveProject(values)}
          validate={values => {
            const errors = {};
            if (values.projectName === '' || values.projectName === null) {
              errors.projectName = 'Project Name is required';
              showCustomToast(errors.projectName, 'error');
            } else if (
              values.description === '' ||
              values.description === null
            ) {
              errors.description = 'Description is required';
              showCustomToast(errors.description, 'error');
            }
            return errors;
          }}>
          {({handleChange, handleSubmit, values, errors, validateForm}) => (
            <>
              <TextInputComponent
                placeholder="Project Name"
                onChangeText={handleChange('projectName')}
                onBlur={() => validateForm()}
                value={values.projectName}
                error={errors.projectName}
              />
              <TextInputComponent
                placeholder="Description"
                onChangeText={handleChange('description')}
                onBlur={() => validateForm()}
                value={values.description}
                error={errors.description}
              />
              <ButtonComponent
                title="Add Project"
                onPress={() => {
                  handleSubmit();
                  validateForm();
                }}
                marginBottom={10}
              />
              <Text style={{marginTop: 20, color: '#132143'}}>Projects</Text>
              {projects.map((project, index) => (
                <ProjectContainer
                  key={index}
                  project={project}
                  onPress={() => {
                    console.log(index);
                    try {
                      deleteProject(index);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              ))}
              <View style={{marginBottom: 10}}></View>
            </>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};
