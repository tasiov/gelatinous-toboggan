import { StyleSheet } from 'react-native';

export const colors = {
  beige: '#FCF3F0',
  auburn: '#A91E39',
  eucalyptus: '#2A8A6F',
  gray: '#6B6B6B',
  nightShadz: '#8A0922',
}

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
    width: 80,
    height: 35,
    backgroundColor: colors.eucalyptus,
    shadowRadius: 2,
    shadowOffset: {width:0, height:2},
    shadowOpacity: .7,
    shadowColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const home = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Pacifico'
  },
});
