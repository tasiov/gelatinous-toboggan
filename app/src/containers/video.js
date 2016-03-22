/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import VideoEntry from '../components/video_entry';
import { contributeToQuilt } from '../actions/index'

const {
  View,
  StyleSheet,
  PropTypes,
  Text,
} = React;

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.onEnd = this.onEnd.bind(this);
  }
  onEnd() {
    console.log(this.props.navigator);
    this.props.contributeToQuilt(this.props.watchQuiltId);
    // for some reason push doesn't work...
    this.props.navigator.replace({ name: 'camera' });
  }

  render() {
    return (
      <View style={styles.container}>
        <VideoEntry onEnd={this.onEnd} quiltId={this.props.watchQuiltId} />
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

function mapDispatchToProps(dispatch) {
  return {
    contributeToQuilt: (id) => {
      dispatch(contributeToQuilt(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
