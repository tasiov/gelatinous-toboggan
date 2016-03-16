import React from 'react-native';
import { shallow } from 'enzyme';
import Button from '../src/components/button';
import { expect } from 'chai';
import sinon from 'sinon';

const {
  Text,
  TouchableHighlight,
} = React;

describe('<Button />', () => {
  it('should render one TouchableHighlight component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(TouchableHighlight)).to.have.length(1);
  });

  it('TouchableHighlight should contain a single Text child', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(TouchableHighlight).children()).to.have.length(1);
    expect(wrapper.find(TouchableHighlight).childAt(0).is(Text)).to.be.true;
  });

  it('should render text inside the Text component', () => {
    const text = 'Test Text';
    const wrapper = shallow(
      <Button text={text} />
    );

    expect(wrapper.find(Text).prop('children')).to.equal(text);
  });

  it('should register click events', () => {
    const onButtonPress = sinon.spy();
    const wrapper = shallow(
      <Button onPress={onButtonPress} />
    );
    wrapper.find(TouchableHighlight).simulate('press');
    expect(onButtonPress.calledOnce).to.be.true;
  });
});
