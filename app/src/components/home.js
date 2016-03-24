/* eslint-disable no-use-before-define, react/prefer-stateless-function */
/* eslint-disable no-use-before-define, react/jsx-no-bind */
import React from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { home, colors } from '../assets/styles';
import NavigationBar from 'react-native-navbar';

const {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text
} = React;

const CustomButton = new MKButton.Builder()
.withStyle(home.button)
.withTextStyle(home.buttonText)
.build();

class Home extends Component {
  constructor(props) {
    super(props);
    this.onPressView = this.onPressView.bind(this);
  }

  onPressView(targetView) {
    this.props.navigator.push({ name: targetView });
  }

  render() {
    return (
      <View style={home.container}>
        <NavigationBar style={home.navbar} statusBar={{hidden: true}}
          title={<Text style={home.navbarText}>Quilt</Text>}
          tintColor={colors.auburn} />
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.eucalyptus} onPress={() => this.onPressView('create')}>
          <Text style={home.buttonText}>Start A Quilt</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.auburn} onPress={() => this.onPressView('view')}>
            <Text style={home.buttonText}>View Quilts</Text>
          </CustomButton>
        </View>
        <View style={home.buttonContainer}>
          <CustomButton backgroundColor={colors.nightShadz} onPress={() => this.onPressView('friends')}>
          <Text style={home.buttonText}>View Friends</Text>
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
