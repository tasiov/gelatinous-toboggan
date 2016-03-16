/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import QuiltEntry from '../components/quilt_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import { fetchQuilts } from '../actions/index';

const {
  ListView,
  PropTypes,
  StyleSheet,
} = React;

// todo: consider factoring out view rendering into own component
class ShowQuilts extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    props.fetchQuilts({username: 'tasio'}); // TODO: pass in the username
  }

  onQuiltClick(quiltId, navigator) {
    // route to specific video not yet implemented
    navigator.push('video');
  }

  onRenderRow(rowData) {
    return <QuiltEntry username={rowData} />;
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.quilts.toArray());
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
      />
    );
  }
}

ShowQuilts.propTypes = {
  onPress: PropTypes.func,
  quilts: PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// get quilts from state
// todo: fetch quilts from server
const mapStateToProps = ( state ) => {
  const quilts = state.get('quilts');
  // const testQuilts = Immutable.List.of(1, 2, 3, 4, 5, 6);
  return { quilts };
};

// todo: set currently watched quilt in state?
const mapDispatchToProps = ( dispatch ) => {
  return {
    fetchQuilts: (data) => {
      dispatch(fetchQuilts(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuilts);
