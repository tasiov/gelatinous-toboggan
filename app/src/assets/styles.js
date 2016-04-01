import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
  beige: '#FCF3F0',
  auburn: '#A91E39',
  eucalyptus: '#2A8A6F',
  gray: '#6B6B6B',
  blue: '#32598B',
  yellowish: '#D39240',
};

export const login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  containerHead: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBody: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 105,
    fontFamily: 'Pacifico',
    color: colors.auburn,
  },
  textfield: {
    marginTop: 20,
    height: 35,
    width: 170,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textInput: {
    color: colors.gray,
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.eucalyptus,
    height: 75,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.blue,
    height: 75,
  },
  button: {
    marginTop: 30,
    width: 95,
    height: 45,
    backgroundColor: colors.blue,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const navbar = StyleSheet.create({
  bar: {
    height: 50,
  },
  text: {
    color: 'white',
    fontFamily: 'Pacifico',
    fontSize: 20,
  },
  leftButton: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
  },
});

export const home = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 60,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    // fontFamily: 'Pacifico',
  },
});

export const viewQuilts = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
});

export const quiltEntry = StyleSheet.create({
  highlight: {
    height: 80,
    padding: 5,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: 'dashed',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    borderRadius: 8,
    borderColor: colors.auburn,
    borderWidth: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  theme: {
    flex: 1,
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    flex: 1,
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const create = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  innerContainerA: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainerB: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: colors.eucalyptus,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textfield: {
    marginBottom: 20,
    height: 35,
    width: 250,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textInput: {
    color: colors.gray,
  },
  text: {
    color: colors.auburn,
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export const username = StyleSheet.create({
  text: {
    color: colors.gray,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export const images = StyleSheet.create({
  machine: {
    marginBottom: 50,
    height: 250,
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const camera = StyleSheet.create({
  preview: {
    flex: 1,
  },
  containerA: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  containerB: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainerA: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
  iconContainerB: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
});

export const video = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  backgroundVideo: {
    flex: 11,
    marginBottom: 26,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  iconContainerA: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.eucalyptus,
    padding: 10,
    borderRadius: 100,
    marginBottom: 26,
    marginLeft: 10,
    marginRight: 10,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
  iconContainerB: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.auburn,
    padding: 10,
    borderRadius: 100,
    marginBottom: 26,
    marginLeft: 10,
    marginRight: 10,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
  check: {
    color: 'white',
  },
  close: {
    color: 'white',
  },
});

export const selectFriends = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
});
