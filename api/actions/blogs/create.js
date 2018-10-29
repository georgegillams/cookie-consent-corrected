import { datumCreate } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from '../../../src/helpers/constants';

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(datumCreate({ redisKey: 'blogs', user: user }, req));
      },
      err => reject(err),
    );
  });
}
