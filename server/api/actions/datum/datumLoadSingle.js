import redis from 'utils/redis';
import { RESOURCE_NOT_FOUND } from 'helpers/constants';

function notFound(settings, resolve, reject) {
  if (settings.resolveIfNotFound) {
    resolve(undefined);
  } else {
    reject(RESOURCE_NOT_FOUND);
  }
}

export default function datumLoadSingle(settings) {
  // load(req) {
  return new Promise((resolve, reject) => {
    redis.lrange(settings.redisKey, 0, -1, (err, reply) => {
      if (settings.sortKey) {
        reply.sort((itemA, itemB) => {
          itemA = JSON.parse(itemA);
          itemB = JSON.parse(itemB);
          if (itemA[settings.sortKey] < itemB[settings.sortKey]) {
            return 1;
          } else if (itemA[settings.sortKey] > itemB[settings.sortKey]) {
            return -1;
          }
          return 0;
        });
      }
      for (let inc = 0; inc < reply.length; inc += 1) {
        const value = JSON.parse(reply[inc]);
        if (!settings.filter || settings.filter(value)) {
          if (settings.includeDeleted || !value.deleted) {
            resolve(value);
            return;
          }
        }
      }
      notFound(settings, resolve, reject);
    });
  });
}
