/* eslint-disable no-use-before-define, react/prefer-stateless-function */
/* eslint-disable no-use-before-define, react/jsx-no-bind */
import React from 'react-native';
import Button from './button';

const {
  Component,
  PropTypes,
  StyleSheet,
  View,
} = React;

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
      <View style={styles.container}>
        <Button text={'Start a Quilt'} onPress={() => this.onPressView('create')} />
        <Button text={'View Quilts'} onPress={() => this.onPressView('view')} />
        <Button text={'View Friends'} onPress={() => this.onPressView('friends')} />
      </View>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.object,
};

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

export default Home;
