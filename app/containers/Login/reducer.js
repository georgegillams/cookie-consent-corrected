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
  CREDENTIALS_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  credentials: {},
  loggingIn: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHANGED:
      return state.set('credentials', action.credentials);
    case LOGIN:
      return state.set('loggingIn', true).set('error', false);
    case LOGIN_SUCCESS:
      return state.set('loggingIn', false);
    case LOGIN_ERROR:
      return state.set('error', action.error).set('loggingIn', false);
    default:
      return state;
  }
}

export default appReducer;
