import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';

describe('actions', () => {
  it('should create an action to push a button', () => {
    const expectedAction = { type: types.BUTTON_PUSH };

    expect(actions.buttonPush()).toEqual(expectedAction);
  });
});
