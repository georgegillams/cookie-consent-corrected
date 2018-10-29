import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

export default class NonCookieBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, ...rest } = this.props; // eslint-disable-line no-shadow

    const classNames = [getClassName('cookie-banner__outer-container')];
    if (className) {
      classNames.push(className);
    }

    return (
      <div className={classNames.join(' ')} {...rest}>
        <div className={getClassName('cookie-banner__inner-container')}>
          <Section light name="Cookies and privacy">
            This website does not use cookies - but if it did, we’d probably
            have a garish alert like this interrupting your browsing experience.
          </Section>
        </div>
      </div>
    );
  }
}
