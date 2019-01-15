import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection, TextLink } from 'components/Typography';
import cookie from 'react-cookies';

import 'containers/pages.scss';

const getClassName = c => c;

export default class Authenticator extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  filteredBlogs = null;

  componentDidMount = () => {
    const sessionCookie = cookie.load('session');
    if (sessionCookie) {
      this.props.setCookiesAllowed();
      this.props.reauthenticate();
    }
  };

  render() {
    const {
      reauthenticate,
      reauthenticating,
      reauthenticatingError,
      sessionKeyChanged,
      cookiesAllowed,
      setCookiesAllowed,
      user,
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
        <Helmet title="Authenticator" />
        {user && <Section name="USER LOGGED IN" />}
        <Section name="Authenticator">
          {cookiesAllowed && <text>cookiesAllowed</text>}
          <br />
          {user && <text>user</text>}
          <br />
          {user && <text>{user.session}</text>}
          <br />
          {reauthenticating && <text>reauthenticating</text>}
          <br />
          {reauthenticatingError && <text>reauthenticatingError</text>}
        </Section>
      </div>
    );
  }
}

Authenticator.propTypes = {
  cookiesAllowed: PropTypes.bool,
  reauthenticating: PropTypes.bool,
  reauthenticatingError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
