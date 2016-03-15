/* eslint-disable no-use-before-define */
import React from 'react-native';
import Camera from 'react-native-camera';

const {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;

class ShowCamera extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.cameraRef = this.cameraRef.bind(this);

    // refactor into redux?
    this.state = {
      isCapturing: false,
    }
  }

  // testing video posting, should be moved into action creator in future
  // also, add spinners, etc
  takePicture() {
    if (!this.state.isCapturing) {
      console.log('start capturing');
      this.setState({
        isCapturing: true,
      })
      this.camera.capture().then((a) => {
        console.log(a)
      })
    } else {
      console.log('stop capturing');
      this.setState({
        isCapturing: false,
      });
      this.camera.stopCapture()
      //   .then(data => {
      //     console.log('send data')
      //     return fetch('https://thawing-ravine-43717.herokuapp.com/api/quilt', {
      //       method: 'POST',
      //       headers: {
      //         "Content-type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         test: 'test',
      //         img: data,
      //       }),
      //     })
      //   .then(res => console.log(res));
      // })
      // .catch(err => console.error(err));
    }
  }

  cameraRef(cam) {
    // not sure the reason for this function yet
    this.camera = cam;
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={this.cameraRef}
          style={styles.preview}
          aspect={'fill'}
          captureMode={Camera.constants.CaptureMode.video}
        >
          <Text style={styles.capture} onPress={this.takePicture}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

export default ShowCamera;
