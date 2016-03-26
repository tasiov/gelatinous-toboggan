import { StyleSheet } from 'react-native';

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
    fontFamily: 'Pacifico',
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
    margin: 2,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
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
  buttonContainer: {
    flex: 1,
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
});
