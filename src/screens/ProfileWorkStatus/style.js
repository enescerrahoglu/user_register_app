import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  dropDownContainerStyle: {
    backgroundColor: '#EDEDED',
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
