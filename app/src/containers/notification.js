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

class NotifContainer extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    this.props.fetchNotifs(2);
  }

  onRenderRow(rowData) {
    return (
      <NotifEntry
        notif={rowData}
        key={rowData.id}
      />
    );
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.notifs.get('notifsList').toArray());
  }

  render() {
    if (this.props.notifs.get('isFetching')) {
      return <Text>Loading Notifications...</Text>;
    }
    return (
      <ListView
        style={{flex: 1}}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
      />
    )
  }
}

function mapStateToProps(state) {
  const notifs = state.get('notifs');
  return { notifs };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifs: (data) => {
      dispatch(fetchNotifs(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifContainer);
