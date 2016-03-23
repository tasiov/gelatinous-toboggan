/* eslint-disable no-use-before-define, react/jsx-no-bind*/
import React from 'react-native';
import Video from 'react-native-video';
import ip from '../config';

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const VideoEntry = ({ quiltId, onEnd, url }) => (
  <View style={styles.container}>
    <Video
      source={{ uri: url }}
      style={styles.backgroundVideo}
      onEnd={onEnd}
    />
  </View>
);

VideoEntry.propTypes = {
  quilt: PropTypes.number,
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
