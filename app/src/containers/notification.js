/* eslint-disable
react/prefer-stateless-function,
no-use-before-define,
react/jsx-no-bind,
react/prop-types
*/
import React, { Component } from 'react-native';
import NotifEntry from '../components/notification_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import { fetchNotifs } from '../actions/index';

const {
ListView,
PropTypes,
StyleSheet,
Text,
View,
} = React;

// todo: consider factoring out view rendering into own component
class NotifContainer extends Component {
constructor(props) {
  super(props);
  // this.getDataSource = this.getDataSource.bind(this);
  // this.onRenderRow = this.onRenderRow.bind(this);
  // props.fetchFriends({ username: 'tasio' });
}

// onSubmitClick(quiltId, navigator) {
//   navigator.pop());
// }

// onRenderRow(rowData) {
//   return (
//     <NotifEntry
//       user={rowData}
//       onCheckboxCheck={this.onCheckboxCheck}
//       onCheckboxUncheck={this.onCheckboxUncheck}
//       key={rowData.id}
//     />
//   );
// }

// getDataSource() {
//   const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
//   return ds.cloneWithRows(this.props.friends.get('friendsList').toArray());
// }

render() {
  // if (this.props.friends.get('isFetching')) {
  //   return <Text>Loading Friends...</Text>;
  // }
  // return (
  //   <ListView
  //     style={styles.container}
  //     dataSource={this.getDataSource()}
  //     renderRow={this.onRenderRow}
  //   />
  // );
  return <View><Text style={{ flex: 1, justifyContent: 'center' }}>NOTIF</Text></View>
}

// FriendsContainer.propTypes = {
// onPress: PropTypes.func,
// // quilts: PropTypes.object,
// friends: PropTypes.object,
// };

// const mapStateToProps = (state) => {
// const friends = state.get('friends');
// // const testUsers = Immutable.List.of('griffin', 'tasio', 'joe', 'sally');
// return { friends };
// };
//
// function mapDispatchToProps(dispatch) {
// return {
//   fetchFriends: (data) => {
//     dispatch(fetchFriends(data));
//   },
// };
}

// export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
export default connect()(NotifContainer);
