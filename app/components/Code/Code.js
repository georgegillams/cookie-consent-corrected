import React from 'react';
import PropTypes from 'prop-types';
import { TextLink } from '../';

import './code.scss';

const Code = props => {
  const { children, lang, githubUrl, className, ...rest } = props;

  const classNameFinal = ['code__outer-container'];
  if (className) classNameFinal.push(className);

  const showTag = lang || githubUrl;
  const showSpace = lang && githubUrl;

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {/* <div className={"code__inner-container"}>{children}</div> */}
      {children}
      {showTag && (
        <span className={'code__lang'}>
          {lang && lang}
          {showSpace && <span>&nbsp;</span>}
          {githubUrl && (
            <TextLink external light href="githubUrl">
              View on Github{' '}
            </TextLink>
          )}
        </span>
      )}
    </div>
  );
};

Code.propTypes = {
  lang: PropTypes.string,
  githubUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Code.defaultProps = {
  lang: null,
  githubUrl: null,
  className: null,
};

export default Code;
