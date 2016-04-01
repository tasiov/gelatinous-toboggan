/* eslint-disable no-use-before-define, react/prefer-stateless-function */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import { create, colors, images } from '../assets/styles';
import { createQuilt } from '../actions/index';
import { MKButton, mdl } from 'react-native-material-kit';
import NavBar from './navbar';

const {
  PropTypes,
  View,
  Image,
  Text,
} = React;

const CustomButton = new MKButton.Builder()
.withText('Add Title')
.withStyle(create.button)
.withTextStyle(create.buttonText)
.build();

const ThemeInput = mdl.Textfield.textfield()
.withAutoCorrect(false)
.withPlaceholder('Title')
.withStyle(create.textfield)
.withUnderlineSize(2)
.withHighlightColor(colors.auburn)
.withTintColor(colors.auburn)
.withTextInputStyle(create.textInput)
.build();

class CreateQuilt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: '',
    };

    this.onTypeTheme = this.onTypeTheme.bind(this);
    this.onCreatePress = this.onCreatePress.bind(this);
  }

  onCreatePress() {
    // todo: add users arguement
    this.props.createQuilt(this.state);
    this.props.navigator.push({ name: 'selectFriends' });
  }

  onTypeTheme(theme) {
    return this.setState({ theme });
  }

  render() {
    return (
      <View style={create.container}>
        <NavBar onPress={this.props.navigator.pop} />
        <View style={create.innerContainerA}>
          <Text style={create.text}>Create A Quilt!</Text>
        </View>
        <View style={create.buttonContainer}>
          <ThemeInput value={this.state.theme} onChangeText={this.onTypeTheme}/>
          <CustomButton onPress={this.onCreatePress} />
        </View>
        <View style={create.innerContainerB}>
          {/*<Image
          style={images.machine}
          source={require('../assets/sewingMachine.png')}
          />*/}
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
  createQuilt: (data) => {
    dispatch(createQuilt(data));
  },
});

export default connect(null, mapDispatchToProps)(CreateQuilt);
