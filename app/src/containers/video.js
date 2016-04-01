/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { postQuilt, postToExistingQuilt } from '../actions/index';
import Button from '../components/button';
import RNFS from 'react-native-fs';
import ip from '../config';
import { video } from '../assets/styles';
import NavBar from '../components/navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
  View,
  StyleSheet,
  PropTypes,
  TouchableHighlight
} = React;

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onReject = this.onReject.bind(this);

    if (this.props.currentQuilt.status === 'watchAdd' || this.props.currentQuilt.status === 'watch') {
      this.url = `http://${ip}:8000/api/quilt/${this.props.currentQuilt.id}?token=${this.props.token}`;
    } else {
      this.url = this.props.currentQuilt.file;
    }
  }

  onAccept() {
    if (this.props.currentQuilt.status === 'add' || this.props.currentQuilt.status === 'create') {
      this._sendVideo();
    } else if (this.props.currentQuilt.status === 'watchAdd') {
      this.props.navigator.replace({ name: 'camera' });
    } else {
      this._replayVideo();
    }
  }

  onReject() {
    if (this.props.currentQuilt.status === 'add' || this.props.currentQuilt.status === 'create') {
      this.props.navigator.replace({ name: 'camera' });
    } else {
      this.props.navigator.pop();
    }
  }

  _sendVideo() {
    RNFS.readFile(this.props.currentQuilt.file, 'base64')
      .then((data) => {
        if (this.props.currentQuilt.status === 'create') {
          this.props.postQuilt(Object.assign(this.props.currentQuilt, {
            creator: this.props.creator,
            video: data,
            token: this.props.token
          }));
        } else {
          this.props.postToExistingQuilt({
            quiltId: this.props.currentQuilt.id,
            creator: this.props.creator,
            video: data,
            token: this.props.token
          });
        }
        this.props.navigator.replace({ name: 'home' });
      });
  }

  _replayVideo() {
    this.refs.video.seek(0);
  }

  render() {
    let acceptButton, rejectButton;
    let repeat = true;
    if (this.props.currentQuilt.status === 'watch') {
      acceptButton = 'Replay';
      rejectButton = 'Back';
      repeat = false;
    } else if (this.props.currentQuilt.status === 'watchAdd') {
      acceptButton = 'Contribute';
      rejectButton = 'Back'
    } else {
      acceptButton = <Icon name="check" style={video.check} size={40} />;
      rejectButton = <Icon name="close" style={video.close} size={40} />;
    }
    return (
      <View style={video.container}>
        <NavBar onPress={this.props.navigator.pop} />
        <Video
          ref="video"
          source={{ uri: this.url }}
          style={video.backgroundVideo}
          repeat={repeat}
        />
        <View style={video.buttonContainer}>
          <TouchableHighlight style={video.iconContainerA} onPress={this.onAccept}>
            {acceptButton}
          </TouchableHighlight>
          <TouchableHighlight style={video.iconContainerB} onPress={this.onReject}>
            {rejectButton}
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

WatchVideo.propTypes = {
  addToQuilt: PropTypes.func,
  currentQuilt: PropTypes.object,
  creator: PropTypes.object,
  navigator: PropTypes.object,
  postQuilt: PropTypes.func,
  watchQuiltId: PropTypes.number,
};

function mapStateToProps(state) {
  const user = state.get('user');

  return {
    currentQuilt: state.get('currentQuilt').toObject(),
    creator: {
      id: user.get('id'),
      username: user.get('username'),
    },
    token: user.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postQuilt: (data) => {
      dispatch(postQuilt(data));
    },
    postToExistingQuilt: (data) => {
      dispatch(postToExistingQuilt(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
