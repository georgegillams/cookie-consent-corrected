import { datumLoad, datumCreate } from '../actions/datum';
import { find } from 'utils/find';
import { INVALID_SESSION, INVALID_CREDENTIALS } from 'helpers/constants';
import { generateKey } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function login(reqSecured, userProfile) {
  return new Promise((resolve, reject) => {
    datumLoad({ redisKey: 'sessions' }).then(sessionData => {
      const session = {};
      session.sessionKey = generateKey();
      session.userId = userProfile.id;
      userProfile.session = session.sessionKey;
      session.userAuthenticatedTimestamp = Date.now();
      datumCreate({ redisKey: 'sessions' }, { body: session }).then(() => {
        setContentLastUpdatedTimestamp();
        resolve(userProfile);
      });

      //
      // const { existingValue: session } = find(
      //   sessionData,
      //   reqSecured.cookies.session,
      //   'sessionKey',
      // );
      // if (session) {
      //   session.userId = userProfile.id;
      //   session.userAuthenticatedTimestamp = Date.now();
      //   resolve(datumUpdate({ redisKey: 'sessions' }, { body: session }));
      //   resolve(userProfile);
      //   setContentLastUpdatedTimestamp();
      // } else {
      //   reject(INVALID_SESSION);
      // }
    });
  });
}
