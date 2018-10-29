import { datumLoad, datumUpdate } from '../actions/datum';
import { find } from 'utils/find';
import {
  INVALID_SESSION,
  INVALID_CREDENTIALS,
} from '../../src/helpers/constants';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function login(reqSecured, userProfile, resolve, reject) {
  datumLoad({ redisKey: 'sessions' }).then(sessionData => {
    const { existingValue: session } = find(
      sessionData,
      reqSecured.cookies.session,
      'sessionKey',
    );
    if (session) {
      session.userId = userProfile.id;
      session.userAuthenticatedTimestamp = Date.now();
      resolve(datumUpdate({ redisKey: 'sessions' }, { body: session }));
      resolve(userProfile);
      setContentLastUpdatedTimestamp();
    } else {
      reject(INVALID_SESSION);
    }
  });
}
