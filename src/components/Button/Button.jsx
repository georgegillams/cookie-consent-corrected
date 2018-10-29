import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { cssModules } from 'bpk-react-utils';

import STYLES from './button.scss';

const getClassName = cssModules(STYLES);

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    const {
      href,
      hrefExternal,
      destructive,
      disabled,
      light,
      bouncy,
      onClick,
      className,
      large,
      children,
      ...rest
    } = this.props;

    const classNameFinal = [getClassName('button__outer')];
    if (destructive) {
      classNameFinal.push(getClassName('button__outer--destructive'));
    }
    if (bouncy) {
      if (!light) {
        classNameFinal.push(getClassName('button__outer--dark-text'));
      }
      classNameFinal.push(getClassName('button__outer--bouncy'));
      if (destructive) {
        classNameFinal.push(getClassName('button__outer--bouncy--destructive'));
      }
      if (disabled) {
        classNameFinal.push(getClassName('button__outer--disabled'));
      }
    } else {
      classNameFinal.push(getClassName('button__outer--no-bouncy'));
      if (destructive) {
        classNameFinal.push(
          getClassName('button__outer--no-bouncy--destructive'),
        );
      }
      if (disabled) {
        classNameFinal.push(getClassName('button__outer--disabled'));
      }
    }
    if (large) {
      classNameFinal.push(getClassName('button__outer--large'));
    }

    if (href && !hrefExternal && !disabled) {
      return (
        <Link to={href} onClick={onClick} className={className} {...rest}>
          <button className={classNameFinal.join(' ')}>{children}</button>
        </Link>
      );
    }

    if (className) classNameFinal.push(className);

    let onClickFinal = onClick;
    if (disabled) {
      onClickFinal = null;
    } else if (href && hrefExternal) {
      onClickFinal = () => {
        window.open(href, '_blank');
      };
    }

    const onDestructiveClickFinal = event => {
      if (this.state.showDestructiveConfirmation) {
        this.setState({ showDestructiveConfirmation: false });
        onClickFinal(event);
      } else {
        this.setState({ showDestructiveConfirmation: true });
        setTimeout(() => {
          this.setState({ showDestructiveConfirmation: false });
        }, 7500);
      }
    };

    return (
      <button
        disabled={disabled}
        onClick={destructive ? onDestructiveClickFinal : onClickFinal}
        className={classNameFinal.join(' ')}
        {...rest}
      >
        {this.state.showDestructiveConfirmation && 'Click again to confirm '}
        {children}
      </button>
    );
  };
}

Button.propTypes = {
  large: PropTypes.bool,
  href: PropTypes.string,
  hrefExternal: PropTypes.bool,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
  bouncy: PropTypes.bool,
  destructive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  large: false,
  href: null,
  hrefExternal: false,
  light: false,
  disabled: false,
  bouncy: false,
  destructive: false,
  onClick: null,
  className: null,
  children: null,
};

export default Button;
