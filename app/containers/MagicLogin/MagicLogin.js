import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import 'containers/pages.scss';

const getClassName = c => c;

export default class Login extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  filteredBlogs = null;

  componentDidMount = () => {
    setTimeout(() => {
      // this.props.loadBlogs();
      const tokenValue = window.location.toString().split('magic-login/')[1];
      this.props.tokenChanged(tokenValue);
      if (this.props.cookiesAllowed) {
        this.props.login();
      }
    }, 2000);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      tokenChanged,
      login,
      user,
      loggingIn,
      loginError,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    // let blogsFinal = blogs;
    // if(blogs && filter) {
    //   blogsFinal = blogs.filter(filter);
    // }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Login" />
        {user && <Section name="USER LOGGED IN" />}
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
            if (!user) {
              login();
            }
          }}
        />
        <Section name="Magic login">
          {loggingIn && <text>loggingIn</text>}
          <br />
          {user && <text>user</text>}
          <br />
          {user && <text>{user.session}</text>}
          <br />
          {loginError && <text>loginError</text>}
        </Section>
      </div>
    );
  }
}

Login.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
