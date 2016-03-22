/* eslint-disable no-use-before-define, react/jsx-no-bind*/
import React from 'react-native';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

// TODO: Change the properties of the quilt information
const QuiltEntry = ({ onClick, quilt }) => (
  <View>
    <TouchableHighlight onPress={() => onClick(quilt.id)} >
      <View style={styles.row}>
        <Text>Title: {quilt.title}</Text>
        <Text>Theme: {quilt.theme}</Text>
        <Text>Status: {quilt.status}</Text>
      </View>
    </TouchableHighlight>
  </View>
);

QuiltEntry.propTypes = {
  onClick: PropTypes.func,
  quilt: PropTypes.object,
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
});

export default QuiltEntry;
