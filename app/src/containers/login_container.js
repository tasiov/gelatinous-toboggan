/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login';
import { loginUser, signupUser } from '../actions/index';
import { bindActionCreators } from 'redux';

class LoginContainer extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    loginOrSignup: user.get('loginOrSignup'),
    isFetching: user.get('isFetching'),
    token: user.get('token'),
    username: user.get('username'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, signupUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
