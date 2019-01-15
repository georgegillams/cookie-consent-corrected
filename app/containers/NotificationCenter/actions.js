import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadNotifications() {
  return {
    type: LOAD_NOTIFICATIONS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function notificationsLoaded(notifications) {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function notificationLoadingError(error) {
  return {
    type: LOAD_NOTIFICATIONS_ERROR,
    error,
  };
}
