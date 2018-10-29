import PropTypes from 'prop-types';
import React from 'react';

import bibtexParse from 'bibtex-parse-js';

import BlogPreviewSection from './BlogPreviewSection';
import Section from './Section';
import SubSection from './SubSection';
import { Tag, ArticleDate } from '../../components';
import { cssModules } from 'bpk-react-utils';

import STYLES from './blog-viewer.scss';

const getClassName = cssModules(STYLES);

const BlogRenderer = props => {
  const {
    blog,
    className,
    centered,
    elementClassName,
    light,
    showEditLink,
    noAnchor,
    ...rest
  } = props;

  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('pages__card')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }
  if (centered) {
    elementClassNameFinal.push(getClassName('blogs--centered'));
  }

  if (!blog.content || blog.content === '') {
    return null;
  }

  const content = `\n${blog.content}`;

  const blogSections = content.split('\n# ');

  const references = null;
  let references2;
  try {
    references2 = blog.bibtex ? bibtexParse.toJSON(blog.blogBibtex) : null;
  } catch (error) {
    console.log(error);
  }

  const tags = blog.tags.split ? blog.tags.split(', ') : blog.tags || [];

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <Section
        className={elementClassNameFinal.join(' ')}
        name={blog.title}
        light={light}
        noAnchor
      >
        {showEditLink && (
          <a
            className={getClassName('pages__link')}
            href={`/admin/blog/${blog.id}`}
          >
            <SubSection
              textClassName={getClassName('blogs__edit-link')}
              name="Edit this blog"
              noAnchor
              link
            />
          </a>
        )}
        <ArticleDate
          className={elementClassNameFinal.join(' ')}
          date={new Date(1000 * blog.publishedTimestamp)}
        />
        <div style={{ marginBottom: '1.0rem' }}>
          {tags.map(tagType => (
            <Tag
              className={getClassName('tag-filter__tag')}
              type={tagType}
              ariaLabel={`View all ${tagType} blogs`}
              link
              style={{ marginBottom: '0.5rem' }}
            />
          ))}
        </div>
        {blogSections.map(section => (
          <BlogPreviewSection
            references={references}
            blogSection={section}
            elementClassName={elementClassName}
            light={light}
            noAnchor={noAnchor}
          />
        ))}
      </Section>
    </div>
  );
};

BlogRenderer.propTypes = {
  centered: PropTypes.bool,
  blog: PropTypes.object.isRequired,
  showEditLink: PropTypes.boolean,
  elementClassName: PropTypes.string,
  className: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogRenderer.defaultProps = {
  centered: false,
  elementClassName: null,
  showEditLink: false,
  className: null,
  light: false,
  noAnchor: false,
};

export default BlogRenderer;
