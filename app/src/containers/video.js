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
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.watchQuilt.get('isFetching')) {
      return <Text>Loading Current Quilt...</Text>;
    }
    return (
      <View style={styles.container}>
        <VideoEntry quilt = {this.props.watchQuilt} />
      </View>
    );
  }
}

WatchVideo.propTypes = {
  watchQuilt: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return { watchQuilt: state.get('watchQuilt') };
}

export default connect(mapStateToProps)(WatchVideo);
