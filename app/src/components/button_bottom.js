/* eslint-disable no-use-before-define */
import React from 'react-native';
const {
  PropTypes,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

// this is our button style that should be reused across the app
const BottomButton = ({ onPress, text, buttonStyle, buttonTextStyle }) => (
    <TouchableHighlight
      style={buttonStyle}
      underlayColor={'gray'}
      onPress={onPress}
    >
      <Text style={buttonTextStyle}>{text}</Text>
    </TouchableHighlight>
);

BottomButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default BottomButton;
