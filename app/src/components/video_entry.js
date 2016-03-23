/* eslint-disable no-use-before-define, react/jsx-no-bind*/
import React from 'react-native';
import Video from 'react-native-video';

const {
  PropTypes,
  StyleSheet,
  View,
} = React;

const VideoEntry = ({ onEnd, url, repeat }) => (
  <View style={styles.container}>
    <Video
      source={{ uri: url }}
      style={styles.backgroundVideo}
      repeat={repeat}
      onEnd={onEnd}
    />
  </View>
);

VideoEntry.propTypes = {
  onEnd: PropTypes.func,
  url: PropTypes.string,
  repeat: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoEntry;
