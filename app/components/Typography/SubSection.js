import PropTypes from 'prop-types';
import React from 'react';
import TextLink from './TextLink';
import BpkText from 'bpk-component-text';

import './typography.scss';

const SubSection = props => {
  const {
    link,
    fancy,
    light,
    name,
    noAnchor,
    className,
    hover,
    noPadding,
    textClassName,
    children,
    ...rest
  } = props;

  const classNameFinal = ['typography__main'];
  const textClassNameFinal = [
    'typography__text',
    'typography__text--subsection',
  ];
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
        <TextLink href={`#${anchorLink}`} className={'typography__anchor-link'}>
          §
        </TextLink>
      )}
      {name && (
        <BpkText
          tagName="h3"
          id={anchorLink}
          textStyle="lg"
          className={textClassNameFinal.join(' ')}
        >
          {name}
        </BpkText>
      )}
      {children}
    </div>
  );
};

SubSection.propTypes = {
  hover: PropTypes.bool,
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

SubSection.defaultProps = {
  hover: false,
  link: false,
  fancy: false,
  noAnchor: false,
  light: false,
  noPadding: false,
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default SubSection;
