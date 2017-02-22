import { combineReducers } from 'redux';

export default combineReducers({
  dummy: (state = {}, action) => {
    // Our dummy reducer doesn't do anything
    return state;
  }
});
