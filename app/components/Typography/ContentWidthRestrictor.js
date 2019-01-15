import React from 'react';
import PropTypes from 'prop-types';

import './content-width-restrictor.scss';

const ContentWidthRestrictor = props => {
  const { children, className, ...rest } = props;

  const classNameFinal = ['content-width-restrictor__outer'];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <div className={'content-width-restrictor__content'}>{children}</div>
    </div>
  );
};

ContentWidthRestrictor.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContentWidthRestrictor.defaultProps = {
  className: null,
};

export default ContentWidthRestrictor;
