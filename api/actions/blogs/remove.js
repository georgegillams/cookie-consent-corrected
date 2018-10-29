import { datumRemove } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from '../../../src/helpers/constants';

export default function remove(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumRemove({ redisKey: 'blogs' }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
