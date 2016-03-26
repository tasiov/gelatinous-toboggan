import React from 'react-native';
const {
  Component,
  Text,
  View,
} = React;
import Button from './button';

const LoginOrSignup = ({ onSelect }) => (
  <View>
    <Text>Quilt!</Text>
    <Button text="Login" onPress={() => onSelect('login')} />
    <Button text="Signup" onPress={() => onSelect('signup')} />
  </View>
);

export default LoginOrSignup;
