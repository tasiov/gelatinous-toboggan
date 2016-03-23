/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import VideoEntry from '../components/video_entry';
import { postQuilt, addToQuilt } from '../actions/index'
import Button from '../components/button';
import RNFS from 'react-native-fs';
import ip from '../config';

const {
  View,
  StyleSheet,
  PropTypes,
  Text,
} = React;

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    if (this.props.currentQuilt.status === 'watch') {
      this.url = `http://${ip}:8000/api/quilt/${this.props.currentQuilt.id}`;
    } else {
      this.url = this.props.currentQuilt.file;
    }
  }

  onAccept() {
    RNFS.readFile(this.props.currentQuilt.file, 'base64')
      .then((data) => {
        console.log('posting');
        if (this.props.currentQuilt.status === 'create') {
          this.props.postQuilt(Object.assign(this.props.currentQuilt, {
            creator: this.props.creator,
            video: data,
          }));
        } else {
          this.props.addToQuilt({
            quiltId: this.props.currentQuilt.id,
            creator: this.props.creator,
            video: data,
          });
        }
        // this.props.navigator.pop();
        // this.props.navigator.pop();
      });
  }

  render() {
    console.log('>>', this.url)
    if (this.props.currentQuilt.status !== 'watch') {
      return (
        <View style={styles.container}>
          <VideoEntry onEnd={this.onEnd} url={this.url} />
          <Button onPress={this.onAccept} text="Submit" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <VideoEntry onEnd={this.onEnd} url={this.url} />
        </View>
      );
    }

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
  const user = state.get('user');

  return {
    currentQuilt: state.get('currentQuilt').toObject(),
    creator: {
      id: user.get('id'),
      username: user.get('username'),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postQuilt: (data) => {
      dispatch(postQuilt(data));
    },
    addToQuilt: (data) => {
      dispatch(addToQuilt(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
