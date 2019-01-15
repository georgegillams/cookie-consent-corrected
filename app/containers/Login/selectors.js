/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = state => state.get('login');
const selectApp = state => state.get('login'); // TODO Change to app

const makeSelectCredentials = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('credentials'),
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
  makeSelectCredentials,
  makeSelectLoggingIn,
  makeSelectLoginError,
};
