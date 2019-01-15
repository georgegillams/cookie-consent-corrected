import {
  CREDENTIALS_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function credentialsChanged(newValue) {
  return {
    type: CREDENTIALS_CHANGED,
    credentials: newValue,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loginSuccessful() {
  return {
    type: LOGIN_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
