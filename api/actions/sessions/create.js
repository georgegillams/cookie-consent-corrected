import { datumCreate } from '../datum';
import crypto from 'crypto';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        reqSecured.body.sessionKey = crypto.randomBytes(20).toString('hex');
        reqSecured.body.lastActive = Date.now();
        resolve(datumCreate({ redisKey: 'sessions', user: user }, reqSecured));
      },
      err => reject(err),
    );
  });
}
