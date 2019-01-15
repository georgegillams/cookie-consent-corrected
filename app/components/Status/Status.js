import React from 'react';
import PropTypes from 'prop-types';
import { TextLink } from '../';

import './status.scss';

const Status = props => {
  const { shadow, type, large, className, ...rest } = props;

  const classNameFinal = ['status__outer-container'];
  if (className) classNameFinal.push(className);

  const statusClassName = ['status__container'];
  if (large) {
    statusClassName.push('status__container--large');
  }
  if (type === 'SUCCESS') {
    statusClassName.push('status__container--success');
  }
  if (type === 'WARN') {
    statusClassName.push('status__container--warn');
  }
  if (type === 'ERROR') {
    statusClassName.push('status__container--error');
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {large && shadow && (
        <div className={'status__shadow-container'}>
          <div className={'status__shadow'} />
        </div>
      )}
      <div className={statusClassName.join(' ')}>
        {type === 'SUCCESS' && '✔'}
        {type === 'WARN' && '!'}
        {type === 'ERROR' && large && '✘'}
      </div>
    </div>
  );
};

Status.propTypes = {
  type: PropTypes.string.isRequired,
  large: PropTypes.bool,
  shadow: PropTypes.bool,
  className: PropTypes.string,
};

Status.defaultProps = {
  shadow: false,
  large: false,
  className: null,
};

export default Status;
