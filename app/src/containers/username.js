/* eslint-disable no-use-before-define */
import React from 'react-native';
import { connect } from 'react-redux';
import { updateUser, checkUsername } from '../actions/index';
import UsernameInput from '../components/username_input';
import { login, username } from '../assets/styles';
import { MKButton } from 'react-native-material-kit';
import _ from 'lodash';
import NavBar from '../components/navbar';

const {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
} = React;

const CustomButton = new MKButton.Builder()
  .withStyle(login.button)
  .build();

class Username extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onCheckUsername = this.onCheckUsername.bind(this);
    this.state = { username: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.duplicateUsername && nextProps.username) {
      nextProps.navigator.push({ name: 'phone' });
    }
  }

  onCheckUsername(){
    if(this.state.username){
      const usernameToLowercase = this.state.username.toLowerCase();
      this.props.checkUsername(this.props.userId,
        { username: usernameToLowercase, token: this.props.token });
    }
  }

  onType(username) {
    this.setState({ username });
    const context = this;
    _.debounce(this.onCheckUsername, 500)();
  }

  onEnter() {
    const usernameToLowercase = this.state.username.toLowerCase();
    this.props.updateUser(this.props.userId, { username: usernameToLowercase, token: this.props.token });
  }

  render() {
    let duplicateUsernameMessage = <Text />;
    if (this.props.duplicateUsername && this.state.username) {
      duplicateUsernameMessage = <Text style={styles.errorMsg}>Username already exists!</Text>;
    }
    return (
      <View style={login.container}>
        <NavBar onPress={this.props.navigator.pop} text={'Username'} />
        <View style={login.containerBody}>
          <Text style={username.text}>Select a Username</Text>
          {duplicateUsernameMessage}
          <UsernameInput
            value={this.state.username}
            onChangeText={this.onType}
          />
          <CustomButton onPress={() => {if(!this.props.duplicateUsername){this.onEnter()}}}>
            <Text style={login.buttonText}>Submit</Text>
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
    checkUsername: (id, data) => {
      dispatch(checkUsername(id, data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Username);
