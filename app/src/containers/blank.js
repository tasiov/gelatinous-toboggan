import React, { View, Component } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../assets/styles';


class Blank extends Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.user.isFetching && !newProps.user.token) {
      this.props.navigator.replace({ name: 'loginOrSignup' });
    } else if (!newProps.user.isFetching) {
      this.props.navigator.replace({ name: 'home' });
    }
  }

  render() {
    return (
      <View style={login.container}></View>
    );
  }
}

function mapStateToProps(state) {
  const user = state.get('user').toObject();
  return {
    user,
  }
}

export default connect(mapStateToProps)(Blank);
