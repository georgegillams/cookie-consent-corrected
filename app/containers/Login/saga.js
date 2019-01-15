/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginSuccessful, loginError } from './actions';
import { setUser } from 'containers/App/actions';
import { NEW_API_ENDPOINT } from 'helpers/constants';
import { makeSelectCredentials } from './selectors';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* doLogin() {
  const credentials = yield select(makeSelectCredentials());
  // Select username from store
  const requestURL = `${NEW_API_ENDPOINT}${
    credentials.useMagicLink ? '/getmagiclink' : '/login'
  }`;

  try {
    // Call our request helper (see 'utils/request')
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Can add third arg for options
    yield put(loginSuccessful());
    if (!credentials.useMagicLink) {
      yield put(setUser(loginResult));
    }
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, () => doLogin());
}
