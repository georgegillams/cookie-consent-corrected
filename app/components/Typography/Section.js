import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';
import TextLink from './TextLink';

import './typography.scss';

const Section = props => {
  const {
    link,
    fancy,
    light,
    noPadding,
    noAnchor,
    name,
    className,
    textClassName,
    children,
    hover,
    ...rest
  } = props;

  const classNameFinal = ['typography__main'];
  const textClassNameFinal = ['typography__text', 'typography__text--section'];
  if (hover) {
    if (light) {
      textClassNameFinal.push('typography--hovering-light');
    } else {
      textClassNameFinal.push('typography--hovering');
    }
  }
  if (!noAnchor) {
    textClassNameFinal.push('typography__text--with-anchor-link');
  }
  if (light) {
    classNameFinal.push('typography--light');
    textClassNameFinal.push('typography--light');
  }
  if (link) {
    classNameFinal.push('typography__link');
    textClassNameFinal.push('typography__link');
  }
  if (noPadding) {
    classNameFinal.push('typography--no-padding');
    textClassNameFinal.push('typography--no-padding');
  }
  if (fancy) {
    classNameFinal.push('typography--fancy');
    textClassNameFinal.push('typography--fancy');
  }
  if (className) {
    classNameFinal.push(className);
  }
  if (textClassName) {
    textClassNameFinal.push(textClassName);
  }

  const anchorLink = `${name}`
    .toLowerCase()
    .split(' ')
    .join('-');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {!noAnchor && (
        <a
          href={`#${anchorLink}`}
          className={`${'typography__anchor-link'} ${getClassName(
            'typography__anchor-link--section',
          )}`}
        >
          §
        </a>
      )}
      {name && (
        <BpkText
          id={anchorLink}
          tagName="h2"
          textStyle="xxl"
          className={textClassNameFinal.join(' ')}
        >
          {name}
        </BpkText>
      )}
      {children}
    </div>
  );
};

Section.propTypes = {
  noAnchor: PropTypes.bool,
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  hover: PropTypes.bool,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

Section.defaultProps = {
  noAnchor: true,
  link: false,
  hover: false,
  fancy: false,
  light: false,
  name: null,
  noPadding: false,
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default Section;
