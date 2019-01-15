import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BpkSmallNewWindowIcon from 'bpk-component-icon/sm/new-window';

import './typography.scss';

const TextLink = props => {
  const {
    external,
    fancy,
    light,
    href,
    className,
    textClassName,
    children,
    onClick,
    ...rest
  } = props;

  const classNameFinal = ['typography__main'];
  classNameFinal.push('typography__link');
  classNameFinal.push('typography__link--text-link');
  classNameFinal.push('typography--no-padding');
  if (light) {
    classNameFinal.push('typography--light');
    classNameFinal.push('typography--light--text-link');
  }
  if (fancy) classNameFinal.push('typography--fancy');
  classNameFinal.push('typography--inline');
  if (className) {
    classNameFinal.push(className);
  }

  return external ? (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={classNameFinal.join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
      <div className={'typography__icon'}>
        <BpkSmallNewWindowIcon className={'typography__icon--inner'} />
      </div>
    </a>
  ) : (
    <Link
      to={href}
      onClick={onClick}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      {children}
    </Link>
  );
};

TextLink.propTypes = {
  onClick: PropTypes.func,
  fancy: PropTypes.bool,
  external: PropTypes.bool,
  light: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
};

TextLink.defaultProps = {
  onClick: null,
  external: false,
  fancy: false,
  light: false,
  href: null,
  children: null,
  textClassName: null,
  className: null,
};

export default TextLink;
