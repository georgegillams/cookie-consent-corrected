/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const TOKEN_CHANGED = 'boilerplate/login/TOKEN_CHANGED';
export const LOGIN = 'boilerplate/login/LOGIN';
export const LOGIN_ERROR = 'boilerplate/login/LOGIN_ERROR';
export const LOGIN_SUCCESS = 'boilerplate/login/LOGIN_SUCCESS';
