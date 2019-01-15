/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = state => state.get('magicLogin');
const selectApp = state => state.get('magicLogin'); // TODO Change to app

const makeSelectToken = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('token'),
  );

// TODO Should come from app state:
// const makeSelectUser = () => createSelector(
//   selectApp,
//   (appState) => appState.get('user')
// );

const makeSelectLoggingIn = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('loggingIn'),
  );

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('error'),
  );

// TODO Shouldn't we import `selectApp` and `makeSelectUser` from elsewhere
export {
  selectLogin,
  selectApp,
  makeSelectToken,
  makeSelectLoggingIn,
  makeSelectLoginError,
};
