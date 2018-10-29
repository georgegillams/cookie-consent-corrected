import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  Research,
  TechnicalOverview,
  Contribute,
  SiteMap,
  NotFound,
} from 'containers';
import redirects from './redirects';
import HelperFunctions from 'helpers/HelperFunctions';

export default store => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {
        auth: { user },
      } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const redirect = (to, nextState, replace, cb) => {
    const exactRequestedPath = `${nextState.location.pathname}${
      nextState.location.search
    }`;
    let destination = to;
    if (HelperFunctions.includes(exactRequestedPath, '?')) {
      redirects.forEach(red => {
        if (red.from === exactRequestedPath) {
          destination = red.to;
        }
      });
    }
    replace(destination);
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route component={App}>
      {/* Home (main) route */}
      <Route exact path="/" component={Home} />

      {redirects.map(red => (
        <Route
          exact
          path={red.from}
          onEnter={(nextState, replace, cb) =>
            redirect(red.to, nextState, replace, cb)
          }
          status={301}
        />
      ))}

      <Route path="research" component={Research} />
      <Route path="technical-overview" component={TechnicalOverview} />
      <Route path="contribute" component={Contribute} />
      <Route path="site-map" component={SiteMap} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
