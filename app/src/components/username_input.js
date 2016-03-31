import React from 'react-native';
import { MKButton, mdl } from 'react-native-material-kit';
import { login, colors } from '../assets/styles';

const UsernameInput = mdl.Textfield.textfield()
  .withAutoCorrect(false)
  .withStyle(login.textfield)
  .withUnderlineSize(2)
  .withHighlightColor(colors.auburn)
  .withTintColor(colors.auburn)
  .withTextInputStyle(login.textInput)
  .build();

export default UsernameInput;
