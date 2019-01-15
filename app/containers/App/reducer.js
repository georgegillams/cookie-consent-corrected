/*
 * AppReducer
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
import cookie from 'react-cookies';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SET_USER,
  SET_COOKIES_ALLOWED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
  cookiesAllowed: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_USER:
      if (state.get('cookiesAllowed')) {
        if (action.user.session) {
          cookie.save('session', action.user.session, {
            path: '/',
            expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
          });
        }
      }
      return state.set(`user`, action.user);
    case SET_COOKIES_ALLOWED:
      // only set a placeholder cookie if there isn't one already
      if (action.cookiesAllowed === undefined) {
        return state;
      }
      if (action.cookiesAllowed && !cookie.load(`session`)) {
        cookie.save('session', 'cookies-allowed', {
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
        });
      }
      return state.set('cookiesAllowed', action.cookiesAllowed);
    default:
      return state;
  }
}

export default appReducer;
