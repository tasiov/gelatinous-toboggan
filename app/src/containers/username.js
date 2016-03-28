import React from 'react-native';
import { connect } from 'react-redux';
const {
  Component,
  Text,
  TextInput,
  View,
} = React;
import { updateUser } from '../actions/index';
import UsernameInput from '../components/username_input';
import Button from '../components/button';
import { login } from '../assets/styles';
import { MKButton } from 'react-native-material-kit';

const CustomButton = new MKButton.Builder()
  .withStyle(login.button)
  .build();

class Username extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.state = {
      username: '',
    };
  }

  onType(username) {
    this.setState({ username });
  }

  onEnter() {
    this.props.updateUser(this.props.userId, { username: this.state.username, token: this.props.token });
    this.props.navigator.push({ name: 'phone' })
  }

  render() {
    return (
      <View style={login.container}>
        <View style={login.containerBody}>
          <Text>Select a Username</Text>
          <UsernameInput
            value={this.state.phoneNumber}
            onChangeText={this.onType}
          />
          <CustomButton onPress={this.onEnter}>
            <Text style={login.buttonText}>{this.props.loginOrSignup}</Text>
          </CustomButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    userId: user.get('id'),
    token: user.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (id, data) => {
      dispatch(updateUser(id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Username);
