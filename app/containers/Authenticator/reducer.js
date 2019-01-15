/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  REAUTHENTICATE,
  REAUTHENTICATE_ERROR,
  REAUTHENTICATE_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  reauthenticating: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REAUTHENTICATE:
      return state.set('reauthenticating', true).set('error', false);
    case REAUTHENTICATE_SUCCESS:
      return state.set('reauthenticating', false);
    case REAUTHENTICATE_ERROR:
      return state.set('error', action.error).set('reauthenticating', false);
    default:
      return state;
  }
}

export default appReducer;
