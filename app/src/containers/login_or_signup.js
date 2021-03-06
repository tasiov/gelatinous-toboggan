/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import LoginOrSignup from '../components/login_or_signup';
import { selectLoginOrSignup } from '../actions/index';
import { bindActionCreators } from 'redux';

import Contacts from 'react-native-contacts';
import { crossReferenceContacts } from '../actions/index';

class LoginOrSignupContainer extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.props.navigator.resetTo({ name: 'home' })
    }
  }

  onSelect(selection) {
    this.props.selectLoginOrSignup(selection);
    this.props.navigator.push({ name: 'login' });
  }

  render() {
    return (
      <LoginOrSignup onSelect={this.onSelect} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectLoginOrSignup: (selection) => {
      return dispatch(selectLoginOrSignup(selection));
    }
  };
}

function mapStateToProps(state) {
  return {
    username: state.get('user').get('username'),
    token: state.get('user').get('token'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrSignupContainer);
