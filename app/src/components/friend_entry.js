/* eslint-disable no-use-before-define */
import React from 'react-native';
import ItemCheckbox from 'react-native-item-checkbox';
import Icon from 'react-native-icons';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

// todo: make these behave like check boxes (edit style=)
const FriendEntry = ({ user, onCheckboxCheck, onCheckboxUncheck }) => {
  return  (
  <TouchableOpacity style={styles.container}>
      <ItemCheckbox
        style={styles.checkbox}
        key={user.id}
        onCheck={()=>onCheckboxCheck(user.id)}
        onUncheck={()=>onCheckboxUncheck(user.id)}
        icon='tree'
        size={60}
        iconSize='small'
        color='#B7E2F0'
      />
      <Text style={styles.username}>{user.username}</Text>
      <Icon
      />
  </TouchableOpacity>
);}


FriendEntry.propTypes = {
  user: PropTypes.object,
  onCheckboxCheck: PropTypes.func,
  onCheckboxUncheck: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  checkbox: {
  },
  username: {
    paddingTop: 20,
    paddingLeft: 10,
  },
});

export default FriendEntry;
