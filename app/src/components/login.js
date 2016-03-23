/* eslint-disable no-use-before-define */
import React from 'react-native';
import { login } from '../assets/styles';
const {
  Component,
  PropTypes,
  Text,
  TextInput,
  View,
} = React;


import Button from './button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.onPress = this.onPress.bind(this);
    this.onType = this.onType.bind(this);
  }

  onPress() {
    this.props.fetchUser(this.state.username);
    this.props.navigator.push({ name: 'home' });
  }

  onType(username) {
    return this.setState({ username });
  }

  // <View style={styles.container}>
  //   <Text>Enter a Username</Text>
  //   <TextInput
  //     style={styles.input}
  //     value={this.state.username}
  //     onChangeText={this.onType}
  //   />
  //   <Button text={'Log In'} onPress={this.onPress} />
  // </View>

  render() {
    return (
      <View style={login.container}>
        <View style={login.containerHead}>
          <Text style={login.title}>Quilt</Text>
        </View>
        <View style={login.containerBody}>
            <TextInput
              style={login.input}
              autoFocus={true}
              placeholder={'Username'}
              value={this.state.username}
              onChangeText={this.onType}
              />
          <Button text={'Log In'} onPress={this.onPress} />
        </View>
      </View>
    );
  }
}

// todo: double check this
Login.propTypes = {
  navigator: PropTypes.object,
  fetchUser: PropTypes.func,
};


export default Login;
