import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tag.scss';

export const TAG_TYPES = {
  tech: 'tech',
  travel: 'travel',
  photography: 'photography',
  events: 'events',
  security: 'security',
};

const tagTypeClassNames = {
  [TAG_TYPES.tech]: 'tag--tech',
  [TAG_TYPES.travel]: 'tag--travel',
  [TAG_TYPES.photography]: 'tag--photography',
  [TAG_TYPES.events]: 'tag--events',
  [TAG_TYPES.security]: 'tag--security',
};

const tagText = {
  [TAG_TYPES.tech]: 'Tech',
  [TAG_TYPES.travel]: 'Travel',
  [TAG_TYPES.photography]: 'Photography',
  [TAG_TYPES.events]: 'Events',
  [TAG_TYPES.security]: 'Security',
};

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      className,
      disabled,
      ariaLabel,
      type,
      children,
      onClick,
      link,
      ...rest
    } = this.props;

    const outerClassNameFinal = ['tag__outer'];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const tagClassName = ['tag'];
    if (type) {
      tagClassName.push(tagTypeClassNames[type]);
    }

    if (this.state.hovering && (link || onClick)) {
      tagClassName.push('tag--hovered');
    }

    if (disabled) {
      outerClassNameFinal.push('tag--disabled');
    }

    const tagComponent = (
      <span className={tagClassName.join(' ')}>{`${tagText[type]}`}</span>
    );

    if (link) {
      return (
        <a
          role="button"
          aria-label={ariaLabel}
          className={outerClassNameFinal.join(' ')}
          to={`/blog?filter=${type}`}
        >
          {tagComponent}
        </a>
      );
    } else if (onClick) {
      return (
        <div
          role="button"
          aria-label={ariaLabel}
          onKeyPress={onClick}
          onMouseEnter={() => {
            this.setState({ hovering: true });
          }}
          tabIndex="0"
          onFocus={() => {
            this.setState({ hovering: true });
          }}
          onMouseLeave={() => {
            this.setState({ hovering: false });
          }}
          onBlur={() => {
            this.setState({ hovering: false });
          }}
          onClick={onClick}
          className={outerClassNameFinal.join(' ')}
          {...rest}
        >
          {tagComponent}
        </div>
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        {tagComponent}
      </div>
    );
  }
}

Tag.propTypes = {
  disabled: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(TAG_TYPES),
  className: PropTypes.string,
  children: PropTypes.node,
  ariaLabel: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  disabled: false,
  link: false,
  onClick: null,
  type: null,
  className: null,
  children: null,
};

export default Tag;
