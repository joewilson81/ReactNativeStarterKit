import { BUTTON_PUSH } from '../actions/types';

const INITIAL_STATE = { buttonPressed: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUTTON_PUSH:
      return { ...state, buttonPressed: true };

    default:
      return state;
  }
}
