import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/enescerrahoglu/user_register_app/main/src/projects.json',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
