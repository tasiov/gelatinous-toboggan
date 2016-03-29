/* eslint-disable
react/prefer-stateless-function,
no-use-before-define,
react/jsx-no-bind,
react/prop-types
*/
import React, { Component } from 'react-native';
import FriendEntry from '../components/friend_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import Button from '../components/button';
import Contacts from 'react-native-contacts';
import { crossReferenceContacts, findUser } from '../actions/index';
import ip from '../config';
import _ from 'lodash';

const {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

// todo: consider factoring out view rendering into own component
class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.findUser = _.debounce(this.findUser.bind(this), 500);
    this.onType = this.onType.bind(this);
    this.state = {
      username: '',
      db: null,
      contacts: [],
    };
  }

  onType(username) {
    this.setState({ username })
    this.findUser(username)
  }

  findUser(username) {
    return fetch(`http://${ip}:8000/api/users?username=${this.state.username}`)
      .then(response => {
        console.log(response);
        if (response.ok) {
          this.setState({ db: JSON.parse(response._bodyInit) });
        }
      })
  }

  componentWillMount() {
    Contacts.getAll((err, contacts) => {
      if (err) {
        console.log('error', err);
      } else {
        const cleanContacts = contacts.reduce((acc, nxt) => {
          acc.push({
            fullName: `${nxt.givenName || ''} ${nxt.familyName || ''}`,
            emails: nxt.emailAddresses.map(obj => obj.email),
            phoneNumbers: nxt.phoneNumbers.map(obj => obj.number),
          });
          return acc;
        }, []);
        this.props.crossReferenceContacts(cleanContacts, this.props.token, this.props.userId);
      }
    });
  }

  render() {
    let foundUser;
    if (this.state.db) {
      foundUser = (
        <TouchableHighlight>
          <Text>Username</Text>
          <Text>{this.state.db.username}</Text>
        </TouchableHighlight>
      );
    } else {
      foundUser = (
        <Text>Find Your Friends</Text>
      )
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Search"
          value={this.state.username}
          onChangeText={this.onType}
        />
        {foundUser}
        <Button text={'Invite!'} onPress={this.onInvitePress} />
      </View>
    );
  }
}

FindFriends.propTypes = {
  onPress: PropTypes.func,
  // quilts: PropTypes.object,
  friends: PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const friends = state.get('friends');
  const user = state.get('user');
  return {
    friends,
    username: user.get('username'),
    token: user.get('token'),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    crossReferenceContacts: (contacts, token, uid) => {
      dispatch(crossReferenceContacts(contacts, token, uid));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
