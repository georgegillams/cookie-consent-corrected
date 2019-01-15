import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import './photo-gallery.scss';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const PhotoGallery = props => {
  const { images, className, ...rest } = props;

  const classNameFinal = ['photo-gallery__container'];
  if (className) classNameFinal.push(className);

  return (
    <div
      className={classNameFinal.join(' ')}
      style={{ height: '30vw' }}
      {...rest}
    >
      <FadingLazyLoadedImage
        className={'photo-gallery__image0'}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[0]}
      />
      <FadingLazyLoadedImage
        className={'photo-gallery__image1'}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={800}
        src={images[1]}
      />
      <FadingLazyLoadedImage
        className={'photo-gallery__image2'}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[2]}
      />
      <FadingLazyLoadedImage
        className={'photo-gallery__image3'}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[3]}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

PhotoGallery.defaultProps = {
  className: null,
};

export default PhotoGallery;
