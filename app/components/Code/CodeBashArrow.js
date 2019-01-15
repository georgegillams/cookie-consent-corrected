import React from 'react';
import PropTypes from 'prop-types';

import './code.scss';

const CodeBashArrow = props => (
  <span {...props} className={'code__bash-arrow'}>
    {'▶ '}
  </span>
);

CodeBashArrow.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeBashArrow.defaultProps = {
  lang: null,
  className: null,
};

export default CodeBashArrow;
