import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import { navbar, colors } from '../assets/styles';

const {
  Text,
  PropTypes,
} = React;

const leftButton = (onPress) => (
  <Text style={navbar.leftButton} onPress={onPress}>Back</Text>
);

const NavBar = ({ onPress }) => (
  onPress ?
    <NavigationBar style={navbar.bar} statusBar={{ hidden: true }}
      title={<Text style={navbar.text}>Quilt</Text>}
      tintColor={colors.auburn} leftButton={leftButton(onPress)}
    />
  :
    <NavigationBar style={navbar.bar} statusBar={{ hidden: true }}
      title={<Text style={navbar.text}>Quilt</Text>}
      tintColor={colors.auburn}
    />
);

NavBar.propTypes = {
  onPress: PropTypes.func,
};

export default NavBar;
