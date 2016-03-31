import React from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Login from '../src/components/login';
import Button from '../src/components/button'

const {
  View,
  Text,
  TextInput,
} = React;

describe('<Login />', () => {
  it('should render one View component', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(View)).to.have.length(1);
  })

  it('View should contain Text, TextInput, and Button', () => {
    const wrapper = shallow(<Login />);
    const view = wrapper.find(View);
    expect(view.children()).to.have.length(3);
    expect(view.find(Text)).to.have.length(1);
    expect(view.find(TextInput)).to.have.length(1);
    expect(view.find(Button)).to.have.length(1);
  })

  it('should update state of TextInput as user types', () => {
    const onType = sinon.spy();
    const wrapper = shallow(<Login />);
    const val = 'myusername';

    expect(wrapper.state('username')).to.equal('');
    wrapper.find(TextInput).simulate('changeText', val);
    expect(wrapper.state('username')).to.equal(val);
  });
});
