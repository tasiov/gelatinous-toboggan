/* eslint-disable no-use-before-define */

// Source: https://github.com/sconxu/react-native-checkbox

import React, { Component } from 'react-native';
import _ from 'lodash';

const {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  PropTypes,
} = React;

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      check: this.props.checked,
    };
  }

  onChange() {
    this.setState({ check: !this.state.check });
    this.props.onCheck(this.props.id);
  }

  render() {
    let source = require('../assets/cb_disabled.png');

    if (this.state.check) {
      source = require('../assets/cb_enabled.png');
    }

    let container = (
      <View style={styles.container}>
        <Image
          style={styles.checkbox}
          source={source}
        />
        <View style={styles.labelContainer}>
          <Text style={[styles.label, this.props.labelStyle]}>{_.capitalize(this.props.label)}</Text>
        </View>
      </View>
    );

    return (
      <TouchableHighlight onPress={this.onChange} underlayColor="white">
        {container}
      </TouchableHighlight>
    );
  }
}

CheckBox.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.number,
  onCheck: PropTypes.func,
};

CheckBox.getDefaultProps = {
  label: 'Label',
  checked: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    borderRadius: 3,
  },
  checkbox: {
    width: 35,
    height: 35,
    margin: 5
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
  },
});

export default CheckBox;
