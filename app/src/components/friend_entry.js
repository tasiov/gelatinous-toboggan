/* eslint-disable no-use-before-define */
import React from 'react-native';
import ItemCheckbox from 'react-native-item-checkbox';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

// todo: make these behave like check boxes (edit style=)
const FriendEntry = ({ user }) => (
  <TouchableOpacity style={styles.container}>
    <View>
      <ItemCheckbox />
      <Text>{user.username}</Text>
    </View>
  </TouchableOpacity>
);

FriendEntry.propTypes = {
  username: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FriendEntry;
