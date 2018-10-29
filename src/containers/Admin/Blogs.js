import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isBlogsLoaded,
  load as loadBlogs,
  remove as deleteBlog,
} from 'redux/modules/blogs';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  AdminOnly,
  Loading,
  TagFilter,
  Button,
  BlogsList,
  APIEntity,
} from 'components';
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
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    blogs: state.blogs ? state.blogs.data : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ deleteBlog, loadBlogs }, dispatch),
)
export default class Blogs extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    deleteBlog: PropTypes.func.isRequired,
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
    this.interval = setInterval(
      this.reloadBlogsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
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
    const {
      user,
      blogs,
      deleteBlog,
      loadBlogs,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    if (!blogs || blogs.length < 1) {
      return null;
    }

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Blogs" />
        <AdminOnly user={user}>
          <div>
            {!blogs && <Loading />}
            {blogs &&
              blogs.map(blog => (
                <div>
                  <APIEntity entityType="blog" entity={blog} />
                  {blog.title}
                  <br />
                  {!blog.deleted && (
                    <Button
                      destructive
                      onClick={() => {
                        deleteBlog(blog);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  <br />
                  <br />
                </div>
              ))}
            {blogs && <BlogsList blogs={blogs} linkPrefix="/admin/blog" />}
            <Button href="/admin/blog/new">Add blog</Button>
          </div>
        </AdminOnly>
      </div>
    );
  }
}
