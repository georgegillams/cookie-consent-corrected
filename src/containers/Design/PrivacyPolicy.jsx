/* eslint-disable */
import React from 'react';
import Helmet from 'react-helmet';
import BpkImage, { withLoadingBehavior } from 'bpk-component-image';
import { Button, Section, SubSection, TextLink } from 'components';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cookiesAccepted: true };
  }

  acceptCookies = () => {
    this.setState({ cookiesAccepted: true });
    window.localStorage.setItem('cookiesAccepted', 'true');
  };

  componentDidMount = () => {
    this.setState({
      cookiesAccepted:
        window.localStorage.getItem('cookiesAccepted') === 'true',
    });
  };

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Privacy policy and cookies" />
        <Section name="Privacy policy and cookies">
          Oh wow, someone&apos;s actually reading this!
          <br />
          <br />
          By allowing cookies to be stored, you will generate a session ID which
          will be stored on your computer (as a cookie) and in my database
          indefinitely, along with your public IP address.
          <br />
          <br />
          The only other personal information I will collect and store is that
          which you explicitly submit in form fields (if you register for an
          account or submit comments etc).
          <br />
          <br />
          Your information will never be made available to any third-party
          organisations.
          <br />
          <br />
          {!this.state.cookiesAccepted && (
            <Button onClick={this.acceptCookies}>
              I agree to my data and cookies being used in this way.
            </Button>
          )}
        </Section>
      </div>
    );
  }
}

export default PrivacyPolicy;
