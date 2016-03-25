/* eslint-disable no-use-before-define */
import React from 'react-native';
import { MKButton, mdl } from 'react-native-material-kit';
import { login, colors } from '../assets/styles';

const {
  Component,
  PropTypes,
  View,
  Text,
} = React;

const Textfield = mdl.Textfield.textfield()
  .withAutoCorrect(false)
  .withPlaceholder('Username')
  .withKeyboardType(this.onType)
  .withStyle(login.textfield)
  .withUnderlineSize(2)
  .withHighlightColor(colors.auburn)
  .withTintColor(colors.auburn)
  .withTextInputStyle(login.textInput)
  .build();

  const CustomButton = new MKButton.Builder()
  .withText("LOG IN")
  .withStyle(login.button)
  .withTextStyle(login.buttonText)
  .build();

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

  render() {
    return (
      <View style={login.container}>
        <View style={login.containerHead}>
          <Text style={login.title}>Quilt</Text>
        </View>
        <View style={login.containerBody}>
          <Textfield/>
          <CustomButton onPress={this.onPress}/>
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
