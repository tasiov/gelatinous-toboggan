import React from 'react-native';
import { connect } from 'react-redux';
const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;
import Button from '../components/button';
import PhoneInput from '../components/phone_input';
import { updateUser } from '../actions/index';

class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);

    this.state = {
      phoneNumber: '',
    };
  }

  onType(phoneNumber) {
    this.setState({ phoneNumber });
  }

  onEnter() {
    this.props.updateUser(this.props.userId, { phoneNumber: this.state.phoneNumber, token: this.props.token });
    this.props.navigator.push({ name: 'contacts' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter Your Phone Number</Text>
        <PhoneInput
          style={styles.input}
          value={this.state.phoneNumber}
          onChangeText={this.onType}
        />
        <Button text="Enter" onPress={this.onEnter} />
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
});

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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
