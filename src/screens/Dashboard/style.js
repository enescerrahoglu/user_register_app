import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  image_container: {
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#EDEDED',
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 1000,
    overflow: 'hidden',
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
  informationContainer: {
    backgroundColor: '#EDEDED',
    width: '95%',
  },
});
