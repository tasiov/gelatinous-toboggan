import React from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Immutable, { Map } from 'immutable';
import reducer from '../../src/reducers/user_reducer';
import { SET_USER } from '../../src/constants/ActionTypes'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle SET_USER', () => {
    const user = {
      id: 1,
      username: 'Griffin',
    };
    const reduction = reducer(Map(), {
      type: SET_USER,
      payload: user
    });
    expect(Immutable.is(reduction, Map(user))).to.be.true;
  });
});
