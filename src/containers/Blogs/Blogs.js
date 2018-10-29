import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isLoaded as isBlogsLoaded,
  load as loadBlogs,
} from 'redux/modules/blogs';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { ArticleCard, BlogsList, Loading, TagFilter, Tag } from 'components';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isBlogsLoaded(getState())) {
        promises.push(dispatch(loadBlogs()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    blogs: state.blogs ? state.blogs.data : null,
  }),
  dispatch => bindActionCreators({ loadBlogs }, dispatch),
)
export default class Blogs extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    loadBlogs: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.reloadBlogsIfNecessary();
    }, CHECK_FOR_NEW_CONTENT_INTERVAL);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadBlogsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadBlogs();
    }
  };

  render() {
    const { blogs, loadBlogs, className, ...rest } = this.props; // eslint-disable-line no-shadow

    if (!blogs || blogs.length < 1) {
      return null;
    }

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Travel" />
        {/* <TagFilter
          selectedTags={this.state.selectedTags}
          onSelectedTagsChanged={nst => {
            this.setState({ selectedTags: nst });
          }}
          className={getClassName('pages__tag-filter')}
        /> */}
        {!blogs && <Loading />}
        {blogs && (
          <BlogsList
            blogs={blogs.filter(bx => {
              return bx.showInBlogsList && bx.published && !bx.deleted;
            })}
            linkPrefix="/blog"
          />
        )}
      </div>
    );
  }
}
