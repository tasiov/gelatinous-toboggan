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
import { getUserContacts, postFriends } from '../actions/index';
import NavBar from '../components/navbar';
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
    this.getDataSource = this.getDataSource.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onFriend = this.onFriend.bind(this);

    this.props.getUserContacts(this.props.token, this.props.userId);

    this.state = {
      username: '',
      db: null,
      filteredContacts: [],
    };
  }

  onType(username) {
    this.setState({ username })
    this.findUser(username);
  }

  findUser(username) {
    fetch(`http://${ip}:8000/api/users?username=${this.state.username}`)
      .then(response => {
        if (response.ok) {
          this.setState({ db: JSON.parse(response._bodyInit) });
        }
      }).catch(err => console.log(err))

    this.setState({
      filteredContacts: this.props.contacts.filter(elem => elem.username.search(this.state.username) !== -1)
    });

  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.state.filteredContacts);
  }

  onRenderRow(rowData) {
    // TODO: pass down onFriend method to send friend request immediately on click
    return (
        <FriendEntry
          user={rowData}
          onCheck={this.onCheck}
          checked
          key={rowData.id}
        />
    );
  }

  onBack() {
    this.props.navigator.pop();
  }

  onFriend(id) {
    this.props.postFriends(this.props.userId, id);
  }

  render() {
    let foundUser;
    if (this.state.db) {
      foundUser = (
        <View>
          <Text>Username</Text>
          <Button text={this.state.db.username} onPress={() => onFriend(this.state.db.id)} />
        </View>
      );
    } else {
      foundUser = (
        <Text>Find Your Friends</Text>
      );
    }
    return (
      <View style={styles.container}>
        <NavBar onPress={this.onBack} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Search"
          value={this.state.username}
          onChangeText={this.onType}
        />
        {foundUser}
        <Text>Contacts</Text>
        <ListView
          dataSource={this.getDataSource()}
          renderRow={this.onRenderRow}
        />
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
  const contacts = state.get('contacts').get('contactList').toArray();
  const user = state.get('user');
  return {
    contacts,
    userId: user.get('id'),
    username: user.get('username'),
    token: user.get('token'),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getUserContacts: (token, uid) => {
      return dispatch(getUserContacts(token, uid));
    },
    postFriends: (userId, friendIds) => {
      return dispatch(postFriends(userId, friendIds));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
