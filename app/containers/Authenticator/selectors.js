/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectAuthenticator = state => state.get('authenticator');

const makeSelectSessionKey = () =>
  createSelector(
    selectAuthenticator,
    authenticatorState => authenticatorState.get('sessionKey'),
  );

const makeSelectReauthenticating = () =>
  createSelector(
    selectAuthenticator,
    authenticatorState => authenticatorState.get('reauthentication'),
  );

const makeSelectReauthenticatingError = () =>
  createSelector(
    selectAuthenticator,
    authenticatorState => authenticatorState.get('error'),
  );

export {
  selectAuthenticator,
  makeSelectSessionKey,
  makeSelectReauthenticating,
  makeSelectReauthenticatingError,
};
