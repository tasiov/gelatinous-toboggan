import { StyleSheet } from 'react-native';

export const login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF3F0',
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
    color: '#A91E39',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
});
