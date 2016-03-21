/* eslint-disable no-use-before-define */
import React from 'react-native';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

const QuiltEntry = ({ onClick, quilt }) => {
  return (
  <View>
    <TouchableHighlight onPress={() => onClick(quilt['id'])} >
      <View style={styles.row}>
        <Text>{quilt['filename']}</Text>
        <Text>**</Text>
      </View>
    </TouchableHighlight>
  </View>
);}

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
