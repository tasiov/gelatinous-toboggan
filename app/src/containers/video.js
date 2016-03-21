/* eslint-disable no-use-before-define */
import React, { Component }  from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';

const {
  View,
  StyleSheet,
  PropTypes,
  Text
} = React;

const vid = '/Users/maryam/Documents/hackreactor/gelatinous-toboggan/server/db/videos/video4.mp4';

class WatchVideo extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    if(this.props.watchQuilt.get('isFetching')) {
      return <Text>Loading Current Quilt...</Text>
    } else {
      return (
        <View style={styles.container}>
          <Text> Theme: {this.props.watchQuilt.get('theme')}</Text>
          <Video source={{ uri: vid }} style={styles.backgroundVideo} />
        </View>
      )
    }
  }
}

WatchVideo.propTypes = {
  watchQuilt: PropTypes.object,
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

const mapStateToProps = (state) => {
  return { watchQuilt: state.get('watchQuilt') };
};

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchQuiltVideo: (data) => {
//       dispatch(fetchQuiltVideo(data));
//     },
//   };
// }

export default connect(mapStateToProps)(WatchVideo);
