/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import VideoEntry from '../components/video_entry';
import { postQuilt, addToQuilt, contributeToQuilt } from '../actions/index'

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

  onAccept() {
    rNFS.readFile(this.props.file, 'base64')
      .then((data) => {
        if (this.props.contribQuiltId === null) {
          this.props.postQuilt(Object.assign(this.props.buildQuilt, {
            creator: this.props.creator,
            video: data,
          }));
        } else {
          this.props.addToQuilt({
            quiltId: this.props.contribQuiltId,
            creator: this.props.creator,
            video: data,
          });
        }
        // this.props.navigator.pop();
        // this.props.navigator.pop();
      });
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
  return {
    buildQuiltId: state.get('buildQuilt').get('id'),
    buildQuiltFile: state.get('buildQuilt').get('file'),
    contribQuiltId: state.get('contribQuilt').get('id'),
    contribQuiltFile: state.get('buildQuilt').get('file'),
    watchQuiltId: state.get('watchQuilt').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contributeToQuilt: (id) => {
      dispatch(contributeToQuilt(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
