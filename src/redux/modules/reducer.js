import multireducer from 'multireducer';
import { combineReducers } from 'redux';
import { pagination } from 'violet-paginator';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import blogs from './blogs';
import gts from './gts';
import comments from './comments';
import payments from './payments';
import counter from './counter';
import info from './info';
import notifications from './notifications';
import sessions from './sessions';
import widgets from './widgets';
import { reducer as form } from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter,
  }),
  info,
  notifications,
  comments,
  blogs,
  gts,
  payments,
  sessions,
  pagination,
  widgets,
});
