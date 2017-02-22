import reducer from '../../src/reducers/DummyReducer';
import * as types from '../../src/actions/types';

describe('DummyReducer', () => {
  const INITIAL_STATE = { buttonPressed: false };

  it('should return the initial state', () => {
    // When the app first mounts, the state is undefined
    // Simulate this with an empty action object and we should get
    // a response that looks exactly like our INITIAL_STATE object.
    const previousState = undefined;
    const action = {};
    const expectedState = INITIAL_STATE;

    expect(reducer(previousState, action))
      .toEqual(expectedState);
  });

  it('Should handle BUTTON_PUSH', () => {
    const previousState = INITIAL_STATE;
    const action = { type: types.BUTTON_PUSH };
    const expectedState = { buttonPressed: true };

    expect(reducer(previousState, action))
      .toEqual(expectedState);
  });
});
