import React from 'react';
import PropTypes from 'prop-types';

import './code.scss';

const CodeInline = props => {
  const { children, className, ...rest } = props;

  const classNameFinal = [
    'code__outer-container',
    'code__outer-container--light',
  ];
  if (className) classNameFinal.push(className);

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {children}
    </span>
  );
};

CodeInline.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeInline.defaultProps = {
  lang: null,
  className: null,
};

export default CodeInline;
