/* eslint-disable no-use-before-define */
import React from 'react-native';
import { connect } from 'react-redux';
const {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
} = React;
import { updateUser } from '../actions/index';
import UsernameInput from '../components/username_input';
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
    this.state = { username: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.duplicateUsername && nextProps.username) {
      nextProps.navigator.push({ name: 'phone' });
    }
  }
  onType(username) {
    this.setState({ username });
  }
  onEnter() {
    this.props.updateUser(this.props.userId,
      { username: this.state.username, token: this.props.token });
  }

  render() {
    if (this.props.duplicateUsername) {
      return (
        <View style={login.container}>
          <View style={login.containerBody}>
            <Text style={styles.errorMsg}>Username already exists!</Text>
            <Text>Select a Username</Text>
            <UsernameInput
              value={this.state.username}
              onChangeText={this.onType}
            />
            <CustomButton onPress={this.onEnter}>
              <Text style={login.buttonText}>{this.props.loginOrSignup}</Text>
            </CustomButton>
          </View>
        </View>
      );
    }
    return (
      <View style={login.container}>
        <View style={login.containerBody}>
          <Text>Select a Username</Text>
          <UsernameInput
            value={this.state.username}
            onChangeText={this.onType}
          />
          <CustomButton onPress={this.onEnter}>
            <Text style={login.buttonText}>{this.props.loginOrSignup}</Text>
          </CustomButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
  },
  errorMsg: {
    fontSize: 18,
    color: 'red',
  },
});

Username.propTypes = {
  navigator: PropTypes.object,
  updateUser: PropTypes.func,
  userId: PropTypes.number,
  token: PropTypes.string,
  duplicateUsername: PropTypes.bool,
  loginOrSignup: PropTypes.func,
};

function mapStateToProps(state) {
  const user = state.get('user');
  return { userId: user.get('id'),
           duplicateUsername: user.get('duplicateUsername'),
           username: user.get('username'),
           token: user.get('token'),
        };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (id, data) => {
      dispatch(updateUser(id, data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Username);
