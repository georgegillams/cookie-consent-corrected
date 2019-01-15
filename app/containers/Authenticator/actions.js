import {
  REAUTHENTICATE,
  REAUTHENTICATE_SUCCESS,
  REAUTHENTICATE_ERROR,
  SESSION_KEY_CHANGED,
} from './constants';

export function reauthenticate() {
  return {
    type: REAUTHENTICATE,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function sessionKeyChanged(sessionKey) {
  return {
    type: SESSION_KEY_CHANGED,
    sessionKey,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reauthenticationSuccessful(user) {
  return {
    type: REAUTHENTICATE_SUCCESS,
    user,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function reauthenticationError(error) {
  return {
    type: REAUTHENTICATE_ERROR,
    error,
  };
}
