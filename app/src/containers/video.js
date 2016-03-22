/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import VideoEntry from '../components/video_entry';

const {
  View,
  StyleSheet,
  PropTypes,
  Text,
} = React;

class WatchVideo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VideoEntry quiltId={this.props.watchQuiltId} />
      </View>
    );
  }
}

WatchVideo.propTypes = {
  watchQuiltId: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return { watchQuiltId: state.get('watchQuilt').get('id') };
}

export default connect(mapStateToProps)(WatchVideo);
