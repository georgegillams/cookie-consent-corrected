import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLoadingBehavior,
  withLazyLoading,
} from 'bpk-component-image';
import { Section, SubSection } from '../';
import { Link } from 'react-router';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from './article-card.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export const CARD_LAYOUTS = {
  auto: 'auto',
  narrow: 'narrow',
  narrowCompact: 'narrowCompact',
};

const MONTH_MAPPINGS = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

class ArticleCard extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      day,
      month,
      imageBorder,
      bannerColor,
      fillImageSrc,
      light,
      linkUrl,
      href,
      imageSrc,
      title,
      ariaLabel,
      className,
      backgroundImageClassName,
      imageClassName,
      layout,
      children,
      ...rest
    } = this.props;

    const classNameFinal = [getClassName('article-card')];
    const centerClassNames = [getClassName('article-card__center-container')];
    const contentContainerClassNames = [
      getClassName('article-card__inner-container'),
    ];
    const dateContainerClassNames = [getClassName('article-card__date')];

    const bannerClassNames = [getClassName('article-card__banner')];
    if (light) {
      bannerClassNames.push(getClassName('article-card__banner--light'));
    }
    if (this.state.hovering) {
      bannerClassNames.push(getClassName('article-card__banner--hovered'));
    }
    const outerBannerClassNames = [
      getClassName('article-card__outer-container'),
    ];
    if (layout === CARD_LAYOUTS.narrowCompact) {
      classNameFinal.push(getClassName('article-card--narrow-compact'));
      outerBannerClassNames.push(
        getClassName('article-card__outer-container--narrow-compact'),
      );
      centerClassNames.push(
        getClassName('article-card__center-container--narrow-compact'),
      );
      dateContainerClassNames.push(
        getClassName('article-card__date--narrow-compact'),
      );
    } else if (layout === CARD_LAYOUTS.auto) {
      outerBannerClassNames.push(
        getClassName('article-card__outer-container--auto'),
      );
    }
    if (className) classNameFinal.push(className);

    const imageContainerClassNames = [
      getClassName('article-card__image-container'),
    ];

    const imageClassNames = [getClassName('article-card__image')];
    if (imageClassName) {
      imageClassNames.push(imageClassName);
    }

    const backgroundImageClassNames = [
      getClassName('article-card__background'),
    ];
    if (light) {
      backgroundImageClassNames.push(
        getClassName('article-card__background--light'),
      );
    }
    if (backgroundImageClassName) {
      backgroundImageClassNames.push(backgroundImageClassName);
    }

    let cardComponent = (
      <div className={contentContainerClassNames.join(' ')}>
        <div
          className={backgroundImageClassNames.join(' ')}
          style={{ backgroundImage: `url(${fillImageSrc})` }}
        />
        <div className={outerBannerClassNames.join(' ')}>
          <div className={dateContainerClassNames.join(' ')}>
            <SubSection
              hover={this.state.hovering}
              noAnchor
              noPadding
              link
              light={light}
              name={
                HelperFunctions.includes(
                  Object.keys(MONTH_MAPPINGS),
                  `${month}`,
                )
                  ? MONTH_MAPPINGS[`${month}`]
                  : month
              }
            />
            <SubSection
              hover={this.state.hovering}
              noAnchor
              noPadding
              link
              light={light}
              name={day}
            />
          </div>
          <div className={centerClassNames.join(' ')}>
            <Section
              noPadding
              hover={this.state.hovering}
              light={light}
              name={title}
              link
              className={getClassName('article-card__title')}
            />
            <div className={getClassName('article-card__children')}>
              {children}
            </div>
          </div>
          {imageSrc && (
            <div
              className={imageContainerClassNames.join(' ')}
              style={{
                border: imageBorder ? `solid ${imageBorder} 0.1rem` : 'none',
              }}
            >
              <FadingLazyLoadedImage
                className={imageClassNames.join(' ')}
                altText="Card image"
                width={987}
                height={575}
                src={imageSrc}
              />
            </div>
          )}
        </div>
        <div
          className={bannerClassNames.join(' ')}
          style={bannerColor ? { backgroundColor: bannerColor } : {}}
        />
      </div>
    );

    if (linkUrl) {
      cardComponent = (
        <Link
          style={{ textDecoration: 'none' }}
          role="button"
          aria-label={ariaLabel}
          to={linkUrl}
        >
          {cardComponent}
        </Link>
      );
    }
    if (href) {
      cardComponent = (
        <a
          style={{ textDecoration: 'none' }}
          role="button"
          rel="noopener noreferrer"
          target="_blank"
          href={href}
        >
          {cardComponent}
        </a>
      );
    }

    return (
      <div
        role="button"
        onMouseEnter={() => {
          this.setState({ hovering: true });
        }}
        onFocus={() => {
          this.setState({ hovering: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovering: false });
        }}
        onBlur={() => {
          this.setState({ hovering: false });
        }}
        className={classNameFinal.join(' ')}
        {...rest}
      >
        {cardComponent}
      </div>
    );
  }
}

ArticleCard.propTypes = {
  light: PropTypes.bool,
  bannerColor: PropTypes.string,
  imageBorder: PropTypes.bool,
  fillImageSrc: PropTypes.node,
  imageSrc: PropTypes.node,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  layout: PropTypes.oneOf(Object.keys(CARD_LAYOUTS)),
  ariaLabel: PropTypes.string,
  day: PropTypes.number,
  month: PropTypes.string,
  href: PropTypes.string,
  backgroundImageClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  children: PropTypes.node,
};

ArticleCard.defaultProps = {
  ariaLabel: null,
  light: false,
  bannerColor: null,
  imageBorder: null,
  linkUrl: null,
  fillImageSrc: null,
  imageSrc: null,
  title: null,
  className: null,
  layout: CARD_LAYOUTS.auto,
  day: null,
  month: null,
  href: null,
  backgroundImageClassName: null,
  imageClassName: null,
  children: null,
};

export default ArticleCard;
