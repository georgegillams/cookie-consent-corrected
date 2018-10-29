import { datumLoad } from '../actions/datum';
import { find } from 'utils/find';
import { sendMagicLinkEmail } from 'utils/emailHelpers';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './users/usersAllowedAttributes';

export default function getmagiclink(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    datumLoad({ redisKey: 'users' }).then(userData => {
      const { existingValue: userProfile } = find(
        userData,
        reqSecured.body.email.toLowerCase(),
        'email',
      );
      if (userProfile) {
        sendMagicLinkEmail(userProfile);
      }
      resolve({
        success:
          'A magic link has been generated and sent to the email associated with your account',
      });
    });
  });
}
