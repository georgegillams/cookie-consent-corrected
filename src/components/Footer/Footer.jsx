import React from 'react';
import PropTypes from 'prop-types';
import { Logo, Section } from '../';
import TechSpecs from './TechSpecs';
import { cssModules } from 'bpk-react-utils';

import STYLES from './footer.scss';

const getClassName = cssModules(STYLES);

const Footer = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <Section style={{ textAlign: 'center' }} light>
        A draft proposal by George Gillams
      </Section>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
