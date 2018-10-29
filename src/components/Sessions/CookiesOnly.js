import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import Modal from 'react-responsive-modal';
import {
  COOKIE_NAMES,
  APP_VERSION,
  COMPONENT_RELOAD_INTERVAL,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import Button from '../Button/Button';
import Section from '../Typography/Section';
import TextLink from '../Typography/TextLink';
import { cssModules } from 'bpk-react-utils';
import STYLES from './cookie-banner.scss';

const getClassName = cssModules(STYLES);

export default class CookiesOnly extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      cookiesAccepted: false,
    };
  }

  componentDidMount = () => {
    const session = cookie.load('session');
    const cookiesAccepted =
      window.localStorage.getItem('cookiesAccepted') === 'true';
    console.log(`session`, session);
    console.log(`cookiesAccepted`, cookiesAccepted);
    this.setState({
      cookiesAccepted: session && cookiesAccepted,
    });
  };

  rejectCookies = () => {
    window.location = '/';
  };

  acceptCookies = () => {
    this.setState({ cookiesAccepted: true });
    window.localStorage.setItem('cookiesAccepted', 'true');
  };

  render() {
    const { className, children, ...rest } = this.props; // eslint-disable-line no-shadow

    return (
      <div {...rest}>
        {children}
        {!this.state.cookiesAccepted && (
          <Modal
            open
            onClose={() => {
              alert('no can do');
            }}
            center
            closeOnEsc={false}
            closeOnOverlayClick={false}
            showCloseIcon={false}
          >
            <div className={getClassName('cookie-banner__inner-container')}>
              <Section
                name="Privacy and cookies"
                noPadding
                className={getClassName('cookie-banner__blurrb')}
              >
                Since 25 May when GDPR came into practice nobody’s had a bloody
                clue how to be compliant. So here&apos;s yet another opportunity
                to give a website permission to eat cookies. If you don&apos;t
                care, stop reading now!
                <br />
                <br />
                <TextLink
                  href="/design/privacy-policy"
                  onClick={() => {
                    this.setState({ cookieNotificationHidden: true });
                  }}
                >
                  Privacy and cookies policy →
                </TextLink>
              </Section>
              <br />
              <div>
                <Button
                  className={getClassName('cookie-banner__component')}
                  onClick={this.acceptCookies}
                >
                  ACCEPT
                </Button>
                <Button
                  className={getClassName('cookie-banner__component')}
                  small
                  destructive
                  onClick={this.rejectCookies}
                >
                  Nope nope nope
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
