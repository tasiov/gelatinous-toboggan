import React from 'react-native';
import { expect } from 'chai';
import Immutable, { Map, List } from 'immutable';
import reducer from '../../src/reducers/friends_reducer';
import { REQUEST_FRIENDS, RECEIVE_FRIENDS } from '../../src/constants/ActionTypes'

// todo: dry initial state with before each
describe('friends reducer', () => {
  it('should return the initial state', () => {
    const initialState = Map({
      isFetching: false,
      friends: List(),
    });
    const reduction = reducer(undefined, {});
    expect(Immutable.is(reduction, initialState)).to.be.true;
  });

  it('should handle REQUEST_FRIENDS', () => {
    const initialState = Map({
      isFetching: false,
      friends: List(),
    });

    const requestingState = Map({
      isFetching: true,
      friends: List(),
    })

    const firstReduction = reducer(undefined, {
      type: REQUEST_FRIENDS,
    });

    const nextReduction = reducer(initialState, {
      type: REQUEST_FRIENDS,
    });

    expect(Immutable.is(firstReduction, requestingState)).to.be.true;
    expect(Immutable.is(nextReduction, requestingState)).to.be.true;
  });

  it('should handle RECEIVE_FRIENDS', () => {
    const friends = ['Griffin', 'Sarah', 'Sally', 'John'];

    const initialState = Map({
      isFetching: true,
      friends: List(),
    });

    const nextState = Map({
      isFetching: false,
      friends: List(friends),
    })

    const reduction = reducer(undefined, {
      type: RECEIVE_FRIENDS,
      payload: friends,
    });

    expect(Immutable.is(reduction, nextState)).to.be.true;

  });
});
