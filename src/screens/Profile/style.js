import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e9ec',
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#0079ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  dropDownPicker: {
    backgroundColor: '#e7e9ec',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: '#e7e9ec',
    borderWidth: 0,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 10,
  },
});
