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
import Contacts from 'react-native-contacts';
import { crossReferenceContacts, postFriends } from '../actions/index';
import Button from '../components/button';

const {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

// todo: consider factoring out view rendering into own component
class ContactsContainer extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);

    // TODO: consider move to action creator
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

    this.state = {
      checkedFriends: {},
    };
  }

  onCheck(id) {
    const newChecked = this.state.checkedFriends;
    if (newChecked[id]) {
      delete newChecked[id];
    } else {
      newChecked[id] = true;
    }
    this.setState({checkedFriends: newChecked});
  }


  onSubmitClick() {
    const friends = Object.keys(this.state.checkedFriends).map(id => parseInt(id));
    this.props.postFriends(this.props.userId, friends);
    this.props.navigator.push({ name: 'home' });
  }

  onRenderRow(rowData) {
    return (
      <FriendEntry
        user={{id: rowData.id, username: rowData.fullName}}
        onCheck={this.onCheck}
        key={rowData.id}
      />
    );
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.friends.get('friendsList').toArray());
  }

  render() {
    if (this.props.friends.get('isFetching')) {
      return <Text>Loading Friends...</Text>;
    }
    return (
      <View>
        <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
        />
        <Button text="Submit" onPress={this.onSubmitClick} />
      </View>
    );
  }
}

ContactsContainer.propTypes = {
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
  const userId = state.get('user').get('id');
  const token = state.get('user').get('token');
  return {
    friends,
    token,
    userId,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    crossReferenceContacts: (contacts, token, uid) => {
      return dispatch(crossReferenceContacts(contacts, token, uid));
    },
    postFriends: (userId, friendIds) => {
      return dispatch(postFriends(userId, ...friendIds));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
