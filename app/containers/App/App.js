/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavigationBarWrapper from 'containers/NavigationBarWrapper';
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import TechnicalPage from 'containers/TechnicalOverview';
import ContributePage from 'containers/Contribute';
import ResearchPage from 'containers/Research';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import LoginPage from 'containers/Login';
import MagicLoginPage from 'containers/MagicLogin';
import Authenticator from 'containers/Authenticator';
import SiteMap from 'containers/SiteMap';
import Footer from 'components/Footer';
import redirects from 'helpers/redirects';
import './style.scss';

const cleanWindowLocation = location => {
  let result = location;
  result = location.split('http://localhost:3000')[1];
  result = location.split('https://www.georgegillams.co.uk')[1];
  result = location.split(
    'https://georgegillams-boilerplate.herokuapp.com/',
  )[1];
  return result;
};

const getFullRedirect = destination => {
  console.log(`getFullRedirect`);
  if (window && window.location && window.location.toString().includes('?')) {
    console.log(`window.location`, window.loacation);
    const fullPath = cleanWindowLocation(window.location.toString());
    for (let i = 0; i < redirects.length; i += 1) {
      if (redirects[i].from === fullPath) {
        return redirects[i].to;
      }
    }
  }
  return destination;
};

const App = () => (
  <div>
    <Helmet
      titleTemplate="%s - Cookie consent done right"
      defaultTitle="Cookie consent done right"
    >
      <meta name="description" content="Cookie consent done right" />
    </Helmet>
    <Header>
      <NavigationBarWrapper />
    </Header>
    <Authenticator />
    <NotificationCenter />
    <Switch>
      {redirects.map(red => (
        <Route
          exact
          path={red.from}
          render={() => <Redirect to={getFullRedirect(red.to)} />}
          status={301}
        />
      ))}

      <Route exact path="/" component={HomePage} />
      <Route path="/technical-overview" component={TechnicalPage} />
      <Route path="/contribute" component={ContributePage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/magic-login" component={MagicLoginPage} />
      <Route path="/sitemap" component={SiteMap} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
