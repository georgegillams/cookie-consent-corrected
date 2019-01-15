import React from 'react';
import PropTypes from 'prop-types';
import { Logo, Section } from '../';

import { cssModules } from 'bpk-react-utils';

import STYLES from './header.scss';

const getClassName = cssModules(STYLES);

const Header = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('header__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <header id="header" className={outerClassNameFinal.join(' ')} {...rest}>
      <Section
        className={getClassName('header__inner-container')}
        style={{ textAlign: 'center' }}
        light
        noPadding
        name="Cookie consent done right"
      />
      <div className={getClassName('header__inner-container--wide')}>
        {props.children}
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: null,
};

export default Header;
