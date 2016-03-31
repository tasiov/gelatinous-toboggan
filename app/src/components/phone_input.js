import React from 'react-native';
import { MKButton, mdl } from 'react-native-material-kit';
import { login, colors } from '../assets/styles';

const PhoneInput = mdl.Textfield.textfield()
  .withAutoCorrect(false)
  .withStyle(login.textfield)
  .withUnderlineSize(2)
  .withHighlightColor(colors.auburn)
  .withTintColor(colors.auburn)
  .withTextInputStyle(login.textInput)
  .withKeyboardType('phone-pad')
  .build();

export default PhoneInput;
