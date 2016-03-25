/* eslint-disable no-use-before-define, react/prefer-stateless-function */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import { startQuilt } from '../actions/index';
import { createQuilt } from '../assets/styles';
import { MKButton } from 'react-native-material-kit';
import NavBar from './navbar';

const {
  PropTypes,
  Text,
  View,
} = React;

const CustomButton = new MKButton.Builder()
.withText("Create Quilt!")
.withStyle(createQuilt.button)
.withTextStyle(createQuilt.buttonText)
.build();

class CreateQuilt extends Component {
  constructor(props) {
    super(props);
    this.onCreatePress = this.onCreatePress.bind(this);
  }

  onCreatePress() {
    // todo: add users arguement
    this.props.createQuilt();
    this.props.navigator.push({ name: 'camera' });
  }

  render() {
    return (
      <View style={createQuilt.container}>
        <NavBar/>
        <View style={createQuilt.buttonContainer}>
          <CustomButton onPress={this.onCreatePress} />
        </View>
      </View>
    );
  }
}

CreateQuilt.propTypes = {
  navigator: PropTypes.object,
  createQuilt: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createQuilt: () => {
    dispatch(createQuilt());
  },
});

export default connect(null, mapDispatchToProps)(CreateQuilt);
