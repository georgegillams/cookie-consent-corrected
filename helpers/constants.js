const DECIMAL_REGEX = /^[0-9\.]*$/gi;
const INT_REGEX = /^[0-9]*$/gi;
const SORT_CODE_REGEX = /^[0-9\.-]*$/gi;
const STRING_REGEX = /^[A-Za-z0-9\.\ ]*$/gi;
const ID_REGEX = /^[A-Za-z0-9\-]*$/gi;
const UNAME_REGEX = /^[A-Za-z0-9\.\ ]*$/gi;
const NAME_REGEX = /^[A-Za-z\ ]*$/gi;
const MONZOME_LINK_REGEX = /^(https?:\/\/)?monzo\.me\/[A-Za-z_-]+(\/.*)?$/gi;
const NON_EMOJI_REGEX = /[A-Za-z\ 0-9,]*/gi;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi;
const PASSWORD_REGEX = /.{6,}/gi;
const MD_COMPLETE_REGEX = /.*/gi; // TODO UPDATE
const MD_PARTIAL_REGEX = /.*/gi; // TODO UPDATE
const APP_VERSION = '4.0.0';
const COOKIE_NAMES = [
  'session',
  'version',
  'connect.sid',
  'io',
  'sessionId',
  'loggedInAdmin',
  'userComments',
];
const INVALID_SESSION = {
  error: 'authentication',
  reason:
    'Invalid session. Try clearing cookies for this site and then re-authenticate',
};
const INVALID_CREDENTIALS = {
  error: 'authentication',
  reason: 'Error logging in. The credentials supplied are invalid.',
};
const UNAUTHORISED_READ = {
  error: 'authentication',
  reason: 'You are not authorised to read this resource',
};
const UNAUTHORISED_WRITE = {
  error: 'authentication',
  reason: 'You are not authorised to write to this resource',
};
const RESOURCE_NOT_FOUND = {
  error: '404',
  reason:
    "We looked everywhere but we couldn't find that resource. Maybe you need to sign in.",
};
const CHECK_FOR_NEW_CONTENT_INTERVAL = 1000;
const COMPONENT_RELOAD_INTERVAL = CHECK_FOR_NEW_CONTENT_INTERVAL / 2;
const NEW_API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://cookie-consent-corrected.herokuapp.com/api/';
const API_ENDPOINT = NEW_API_ENDPOINT;

export {
  NEW_API_ENDPOINT,
  API_ENDPOINT,
  APP_VERSION,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMPONENT_RELOAD_INTERVAL,
  COOKIE_NAMES,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  ID_REGEX,
  INT_REGEX,
  INVALID_CREDENTIALS,
  INVALID_SESSION,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  RESOURCE_NOT_FOUND,
  SORT_CODE_REGEX,
  STRING_REGEX,
  UNAME_REGEX,
  UNAUTHORISED_READ,
  UNAUTHORISED_WRITE,
};
export default {
  NEW_API_ENDPOINT,
  API_ENDPOINT,
  APP_VERSION,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMPONENT_RELOAD_INTERVAL,
  COOKIE_NAMES,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  ID_REGEX,
  INT_REGEX,
  INVALID_CREDENTIALS,
  INVALID_SESSION,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  RESOURCE_NOT_FOUND,
  SORT_CODE_REGEX,
  STRING_REGEX,
  UNAME_REGEX,
  UNAUTHORISED_READ,
  UNAUTHORISED_WRITE,
};
