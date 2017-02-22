import * as actions from '../../src/actions';

describe('actions', () => {
  it('should create an action to push a button', () => {
    expect(actions.buttonPush()).toMatchSnapshot();
  });
});
