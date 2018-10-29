import { MD_COMPLETE_REGEX, STRING_REGEX } from '../../../src/helpers/constants';

const notificationsAllowedAttributes = [
  { attribute: 'type', pattern: STRING_REGEX },
  { attribute: 'message', pattern: MD_COMPLETE_REGEX },
];

export default notificationsAllowedAttributes;
