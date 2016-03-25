/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import QuiltEntry from '../components/quilt_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import { fetchQuilts, selectWatchQuilt } from '../actions/index';
import { viewQuilts } from '../assets/styles';
import NavBar from '../components/navbar';

const {
  ListView,
  PropTypes,
  Text,
  View,
} = React;

// todo: consider factoring out view rendering into own component
class ShowQuilts extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    this.onQuiltClick = this.onQuiltClick.bind(this);
    this.props.fetchQuilts(
      {
        username: this.props.user.get('username'),
        token: this.props.user.get('token'),
      }
    );
  }

  onQuiltClick(quiltId, status) {
    let currentStatus;
    if (status === 1) {
      currentStatus = 'watch';
    } else {
      currentStatus = 'add';
    }
    this.props.selectWatchQuilt({
      status: currentStatus,
      id: quiltId,
    });
    this.props.navigator.push({ name: 'video' });
  }

  onRenderRow(rowData) {
    return <QuiltEntry onClick={this.onQuiltClick} quilt={rowData} key={rowData.id} />;
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.quilts.get('quiltsList').toArray());
  }

  render() {
    if (this.props.quilts.get('isFetching')) {
      return <Text>Loading Quilts...</Text>;
    }
    return (
      <View style={viewQuilts.container}>
        <NavBar/>
        <ListView
          dataSource={this.getDataSource()}
          renderRow={this.onRenderRow}
        />
      </View>
    );
  }
}

ShowQuilts.propTypes = {
  // onQuiltClick: PropTypes.func,
  quilts: PropTypes.object,
  fetchQuilts: PropTypes.func,
  selectWatchQuilt: PropTypes.func,
  navigator: PropTypes.object,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    quilts: state.get('quilts'),
    user: state.get('user'),
  };
}

// todo: set currently watched quilt in state?
function mapDispatchToProps(dispatch) {
  return {
    fetchQuilts: (data) => {
      dispatch(fetchQuilts(data));
    },
    selectWatchQuilt: (data) => {
      dispatch(selectWatchQuilt(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuilts);
