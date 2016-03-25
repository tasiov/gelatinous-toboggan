/* eslint-disable
no-use-before-define,
react/prefer-stateless-function */

import React from 'react-native';
import LoginContainer from '../containers/login_container';
import Home from '../components/home';
import CreateQuilt from '../components/create_quilt';
// todo: create seperate component/container for quilts
import ShowQuilts from '../containers/quilts';
import ShowCamera from '../containers/camera';
import WatchVideo from '../containers/video';
import FriendsContainer from '../containers/friends';

const {
  Component,
  Navigator,
  View,
} = React;

// todo: refactor into redux-based navigation system
const ROUTES = {
  login: LoginContainer,
  home: Home,
  create: CreateQuilt,
  camera: ShowCamera,
  view: ShowQuilts,
  video: WatchVideo,
  friends: FriendsContainer,
};

class App extends Component {
  configScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    const NextComponent = ROUTES[route.name];
    return <NextComponent route={route} navigator={navigator} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{ name: 'login' }}
          renderScene={this.renderScene}
          configureScene={this.configScene}
        />
      </View>
    );
  }
}

export default App;
