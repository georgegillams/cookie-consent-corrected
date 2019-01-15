import moment from 'moment';

const getTimeDifference = timeStamp => {
  const currentTime = moment();
  return moment(timeStamp).fromNow();
};

export { getTimeDifference };
export default {
  getTimeDifference,
};
