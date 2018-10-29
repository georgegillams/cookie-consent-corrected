import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login,
  logout,
  logoutAll,
  requestMagicLink,
} from 'redux/modules/auth';
import {
  CookiesOnly,
  User,
  LoginForm,
  Section,
  NotificationComp,
  Button,
} from 'components';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    user: state.auth.user,
    loginError: state.auth.loginError,
    magicLinkRequested: state.auth.magicLinkRequested,
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch =>
    bindActionCreators(
      { loadAuth, logout, logoutAll, login, requestMagicLink },
      dispatch,
    ),
)
export default class Login extends Component {
  static propTypes = {
    loadAuth: PropTypes.func.isRequired,
    logoutAll: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    magicLinkRequested: PropTypes.object.magicLinkRequested,
    loginError: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    requestMagicLink: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      credentials: { email: '', password: '' },
    };
  }

  updateCredentials = newValue => {
    this.setState({ credentials: newValue });
  };

  handleSubmit = () => {
    this.props.login(this.state.credentials);
    this.props.loadAuth();
  };

  handleSubmitMagic = () => {
    this.props.requestMagicLink(this.state.credentials);
    this.props.loadAuth();
  };

  logoutAll = () => {
    this.props.logoutAll();
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { loginError, magicLinkRequested, user, ...rest } = this.props;

    return (
      <CookiesOnly>
        <div className="container">
          <Helmet title="Account" />
          {!user && (
            <Section name="Log in">
              {loginError && (
                <NotificationComp type="error">
                  {loginError.reason}
                </NotificationComp>
              )}
              {magicLinkRequested && (
                <NotificationComp type="success">
                  A magic link has been sent to the email provided.
                </NotificationComp>
              )}
              <LoginForm
                credentials={this.state.credentials}
                onDataChanged={this.updateCredentials}
                onSubmit={this.handleSubmit}
                onSubmitMagic={this.handleSubmitMagic}
              />
            </Section>
          )}
          {user && (
            <div>
              <User welcomeMessage={`Your account,`} user={user} />
              <Button
                className={getClassName('pages__component')}
                href={'/account/edit'}
              >
                Edit account
              </Button>
              <Section name="Log out">
                <Button
                  className={getClassName('pages__component')}
                  destructive
                  onClick={this.logout}
                >
                  Logout
                </Button>
                <br />
                <Button
                  className={getClassName('pages__component')}
                  destructive
                  onClick={this.logoutAll}
                >
                  Logout from all devices
                </Button>
              </Section>
            </div>
          )}
        </div>
      </CookiesOnly>
    );
  }
}
