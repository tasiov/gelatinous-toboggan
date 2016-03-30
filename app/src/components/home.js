/* eslint-disable no-use-before-define, react/prefer-stateless-function */
/* eslint-disable no-use-before-define, react/jsx-no-bind */
import React from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { home, colors } from '../assets/styles';
import NavBar from './navbar';
import Keychain from 'react-native-keychain';
import ip from '../config';

const {
  Component,
  PropTypes,
  View,
  Text,
} = React;

const CustomButton = new MKButton.Builder()
  .withStyle(home.button)
  .withTextStyle(home.buttonText)
  .build();

class Home extends Component {
  constructor(props) {
    super(props);
    this.onPressView = this.onPressView.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onPressView(targetView) {
    this.props.navigator.push({ name: targetView });
  }

  onLogout() {
    Keychain.resetInternetCredentials(ip)
      .then(() => this.props.navigator.resetTo({ name: 'loginOrSignup' }));
  }

  render() {
    return (
      <View style={home.container}>
        <NavBar />
        <View style={home.buttonContainer}>
          <CustomButton
            backgroundColor={colors.eucalyptus}
            onPress={() => this.onPressView('create')}
          >
            <Text style={home.buttonText}>Start A Quilt</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.blue} onPress={() => this.onPressView('view')}>
            <Text style={home.buttonText}>View Quilts</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.blue} onPress={() => this.onPressView('findFriends')}>
            <Text style={home.buttonText}>Find Friends</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.blue} onPress={() => this.onPressView('notification')}>
            <Text style={home.buttonText}>View Notifications</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.blue} onPress={() => this.onLogout()}>
            <Text style={home.buttonText}>Logout</Text>
          </CustomButton>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.object,
};

export default Home;
