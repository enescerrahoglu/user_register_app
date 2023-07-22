import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginTop: 10,
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
  countryItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  contentContainer: {
    flexGrow: 1,
  },
  dropDownPicker: {
    backgroundColor: '#EDEDED',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 10,
  },
});
