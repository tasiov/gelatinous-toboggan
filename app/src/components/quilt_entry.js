/* eslint-disable no-use-before-define, react/jsx-no-bind*/
import React from 'react-native';
import { quiltEntry, colors } from '../assets/styles';

const {
  PropTypes,
  Text,
  TouchableHighlight,
  View,
} = React;

// TODO: Change the properties of the quilt information
const QuiltEntry = ({ onClick, quilt }) => (
  <TouchableHighlight
    underlayColor={colors.gray}
    style={quiltEntry.highlight}
    onPress={() => onClick(quilt.id, quilt.status)}
  >
    <View style={quiltEntry.row}>
      <Text style={quiltEntry.theme}>Theme: {quilt.theme}</Text>
      <Text style={quiltEntry.status}>Status: {quilt.status}</Text>
    </View>
  </TouchableHighlight>
);

QuiltEntry.propTypes = {
  onClick: PropTypes.func,
  quilt: PropTypes.object,
};

export default QuiltEntry;
