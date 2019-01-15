/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REAUTHENTICATE } from './constants';
import { reauthenticationSuccessful, reauthenticationError } from './actions';
import { setUser } from 'containers/App/actions';
import { NEW_API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* doReauthentication() {
  const requestURL = `${NEW_API_ENDPOINT}/loadAuth`;

  try {
    // Call our request helper (see 'utils/request')
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
    }); // Can add third arg for options
    yield put(reauthenticationSuccessful());
    yield put(setUser(loginResult));
  } catch (err) {
    yield put(reauthenticationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* reauthenticate() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REAUTHENTICATE, () => doReauthentication());
}
