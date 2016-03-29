/* eslint-disable no-use-before-define */
import React from 'react-native';
import CheckBox from './checkbox';

const {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} = React;

// todo: make these behave like check boxes (edit style=)
const NotifEntry = ({ notif }) => (
  <TouchableOpacity style={styles.container}>
    <CheckBox
      label={notif.message}
    />
  </TouchableOpacity>
);

NotifEntry.propTypes = {
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  username: {
    paddingTop: 20,
    paddingLeft: 10,
  },
});

export default NotifEntry;
