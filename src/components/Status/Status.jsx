import React, { PropTypes } from 'react';
import { TextLink } from '../';
import { cssModules } from 'bpk-react-utils';

import STYLES from './status.scss';

const getClassName = cssModules(STYLES);

const Status = props => {
  const { shadow, type, large, className, ...rest } = props;

  const classNameFinal = [getClassName('status__outer-container')];
  if (className) classNameFinal.push(className);

  const statusClassName = [getClassName('status__container')];
  if (large) {
    statusClassName.push(getClassName('status__container--large'));
  }
  if (type === 'SUCCESS') {
    statusClassName.push(getClassName('status__container--success'));
  }
  if (type === 'WARN') {
    statusClassName.push(getClassName('status__container--warn'));
  }
  if (type === 'ERROR') {
    statusClassName.push(getClassName('status__container--error'));
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {large &&
        shadow && (
          <div className={getClassName('status__shadow-container')}>
            <div className={getClassName('status__shadow')} />
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
