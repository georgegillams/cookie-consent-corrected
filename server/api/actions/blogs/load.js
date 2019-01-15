import { datumLoad } from '../datum';
import authentication from 'utils/authentication';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'blogs',
              sortKey: 'publishedTimestamp',
              includeDeleted: true,
            }),
          );
        } else {
          resolve(datumLoad({ redisKey: 'blogs', filter: ar => ar.published }));
        }
      },
      err => reject(err),
    );
  });
}
