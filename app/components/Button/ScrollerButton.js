import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './scroller-button.scss';

class ScrollerButton extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const { onClick, className, children, ...rest } = this.props;

    const outerClassName = ['scroller-button__outer'];
    const textClassName = ['scroller-button__text'];
    const dotClassName = ['scroller-button__dot'];

    if (className) className.push(outerClassName);

    if (this.state.hovering) {
      textClassName.push('scroller-button__text--hovered');
      dotClassName.push('scroller-button__dot--hovered');
    }

    const buttonComponent = (
      <button
        onClick={onClick}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        className={outerClassName.join(' ')}
        {...rest}
      >
        <span className={textClassName.join(' ')}>{children}</span>
        <div className={dotClassName.join(' ')} />
      </button>
    );

    return buttonComponent;
  }
}

ScrollerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

ScrollerButton.defaultProps = {
  className: null,
  children: null,
};

export default ScrollerButton;
