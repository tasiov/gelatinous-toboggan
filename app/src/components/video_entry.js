/* eslint-disable no-use-before-define, react/jsx-no-bind*/
import React from 'react-native';
import Video from 'react-native-video';

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const video = '/Users/maryam/Documents/hackreactor/gelatinous-toboggan/server/db/videos/video4.mp4';
// const video_uri = "http://10.6.30.48:8000/db/videos/video1.mp4";
// TODO: Change the properties of the quilt information
const VideoEntry = ({ quiltId }) => (
  <View style={styles.container}>
    <Video source={{ uri: `http://10.6.30.77:8000/api/quilt/${quiltId}` }} style={styles.backgroundVideo} />
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
