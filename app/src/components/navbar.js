import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import { navbar, colors } from '../assets/styles';

const {
  Text,
  PropTypes,
} = React;

const NavBar = ({ onPress }) => (
  <NavigationBar style={navbar.bar} statusBar={{hidden: true}}
    title={<Text style={navbar.text}>Quilt</Text>}
    tintColor={colors.auburn} />
)

NavBar.propTypes = {
  onPress: PropTypes.func,
};

export default NavBar;
