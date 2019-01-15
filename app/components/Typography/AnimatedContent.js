import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './animated-content.scss';

class AnimatedContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { inView, className, children, ...rest } = this.props;
    const classNameFinal = ['animated-content__outer-container'];
    if (inView) {
      classNameFinal.push('animated-content__outer-container--in-view');
    }
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        {children}
      </div>
    );
  }
}

AnimatedContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  inView: PropTypes.bool,
};

AnimatedContent.defaultProps = {
  className: null,
  inView: true,
};

export default AnimatedContent;
