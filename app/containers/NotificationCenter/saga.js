/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_NOTIFICATIONS } from './constants';
import { notificationsLoaded, notificationLoadingError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* loadNotifications() {
  // Select username from store
  const requestURL = `${API_ENDPOINT}/notifications/load`;

  try {
    // Call our request helper (see 'utils/request')
    const notifications = yield call(request, requestURL); // Can add third arg for options
    yield put(notificationsLoaded(notifications));
  } catch (err) {
    yield put(notificationLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getNotifications() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}
