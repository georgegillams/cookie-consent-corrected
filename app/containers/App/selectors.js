/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectCookiesAllowed = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('cookiesAllowed'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectUser,
  makeSelectCookiesAllowed,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
};
