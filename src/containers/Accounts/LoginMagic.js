import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  loginMagic,
  load as loadAuth,
} from 'redux/modules/auth';
import { Section, SubSection } from 'components';

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
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
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.loginError,
    user: state.auth.user,
    session: state.sessions.session,
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({ loginMagic, loadAuth }, dispatch),
)
export default class LoginMagic extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    logginError: PropTypes.object,
    user: PropTypes.object,
    session: PropTypes.string,
  };

  static defaultProps = {
    loginError: null,
    user: null,
    session: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      attemptingLogin: true,
    };
  }

  componentDidMount = () => {
    const attemptLogin = () => {
      if (this.props.session && this.state.attemptingLogin) {
        this.props.loginMagic(this.props.params.key);
        this.setState({ attemptingLogin: false });
        // clearInterval(loginInterval);
      }
    };

    const loginInterval = setInterval(attemptLogin, 500);
  };

  render() {
    const { loginError, user, session, loggingIn, ...rest } = this.props;

    return (
      <div className="container">
        {loginError && (
          <NotificationComp type="error">Error loggin in</NotificationComp>
        )}
        <Section name="Magic log in" />
        <Helmet title="Magic log in" />
        {this.state.attemptingLogin && (
          <SubSection noAnchor name="Logging in..." />
        )}
        {user && <SubSection noAnchor name="You're now logged in!" />}
        {!this.state.attemptingLogin &&
          !loggingIn &&
          !user && <SubSection noAnchor name="Invalid key." />}
      </div>
    );
  }
}
