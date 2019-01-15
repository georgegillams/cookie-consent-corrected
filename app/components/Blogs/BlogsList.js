import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Section, ArticleCard } from '../';
import { Link } from 'react-router-dom';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import HelperFunctions from 'helpers/HelperFunctions';

class BlogsList extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const { className, blogs, linkPrefix, ...rest } = this.props;

    return (
      <div>
        {blogs.map(
          (blog => (
            <ArticleCard
              day={
                blog.blogCardDate
                  ? blog.blogCardDate
                  : new Date(1000 * blog.publishedTimestamp).getDate()
              }
              month={new Date(1000 * blog.publishedTimestamp).getMonth()}
              className={'pages__card'}
              fillImageSrc={blog.blogHeroImage}
              imageSrc={blog.blogImage}
              linkUrl={`${linkPrefix}/${blog.id}`}
              title={
                blog.title
                  ? `${blog.title.match(NON_EMOJI_REGEX).join('')}${
                      blog.deleted ? ' (deleted)' : ''
                    }`
                  : 'TITLE ERROR'
              }
              imageBorder={
                blog.blogImageBorderColor ? blog.blogImageBorderColor : null
              }
              bannerColor={blog.blogBannerColor ? blog.blogBannerColor : null}
              autoTallLayout
              light={blog.light}
            >
              {blog &&
                blog.tags &&
                !blog.tags.split &&
                blog.tags.map(tag => (
                  <Tag className={'tag-filter__tag'} type={tag} />
                ))}
            </ArticleCard>
          ): null),
        )}
      </div>
    );
  }
}

BlogsList.propTypes = {
  light: PropTypes.bool,
  bannerColor: PropTypes.string,
  imageBorder: PropTypes.bool,
  fillImageSrc: PropTypes.node,
  imageSrc: PropTypes.node,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  day: PropTypes.number,
  month: PropTypes.string,
  href: PropTypes.string,
  backgroundImageClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  children: PropTypes.node,
};

BlogsList.defaultProps = {
  ariaLabel: null,
  light: false,
  bannerColor: null,
  imageBorder: null,
  linkUrl: null,
  fillImageSrc: null,
  imageSrc: null,
  title: null,
  className: null,
  day: null,
  month: null,
  href: null,
  backgroundImageClassName: null,
  imageClassName: null,
  children: null,
};

export default BlogsList;
