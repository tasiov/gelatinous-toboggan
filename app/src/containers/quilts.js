/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import QuiltEntry from '../components/quilt_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import { fetchQuilts, fetchWatchQuilt } from '../actions/index';

const {
  ListView,
  PropTypes,
  StyleSheet,
  View,
  Text,
} = React;

// todo: consider factoring out view rendering into own component
class ShowQuilts extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    this.onQuiltClick = this.onQuiltClick.bind(this);
    props.fetchQuilts({ username: 'josh' }); // TODO: pass in the username
  }

  onQuiltClick(quiltId) {
    // console.log('quilt id:', quiltId, ' is clicked', this.props);
    // request the current quilt
    this.props.fetchWatchQuilt({quiltId});
    this.props.navigator.push({ name: 'video' });
  }

  onRenderRow(rowData) {
    return <QuiltEntry onClick={this.onQuiltClick} quilt = {rowData} key = {rowData['id']}/>
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.quilts.get('quiltsList').toArray());
  }

  render() {
    if(this.props.quilts.get('isFetching')) {
      return <Text>Loading Quilts...</Text>
    } else {
      return (
        <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
        />
      );
    }
  }
}

ShowQuilts.propTypes = {
  // onQuiltClick: PropTypes.func,
  quilts: PropTypes.object,
  fetchQuilts: PropTypes.func,
  fetchWatchQuilt: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    watchQuilt: state.get('watchQuilt'), // Check if initialise with {} or isFetching = true
    quilts: state.get('quilts'),
  };
};

// todo: set currently watched quilt in state?
function mapDispatchToProps(dispatch) {
  return {
    fetchQuilts: (data) => {
      dispatch(fetchQuilts(data));
    },
    fetchWatchQuilt: (data) => {
      dispatch(fetchWatchQuilt(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuilts);
