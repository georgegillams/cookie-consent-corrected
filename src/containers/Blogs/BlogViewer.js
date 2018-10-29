import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isSingleLoaded as isSingleBlogLoaded,
  loadSingle as loadSingleBlog,
} from 'redux/modules/blogs';
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  create as createComment,
  save as saveComment,
} from 'redux/modules/comments';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { BlogRenderer, Comments } from 'components';
import { CommentArea } from 'containers';
import NotFound from '../NotFound/NotFound';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      if (!isCommentsLoaded(getState(), params.id)) {
        promises.push(dispatch(loadComments(params.id)));
      }
      if (!isSingleBlogLoaded(getState(), params.id)) {
        promises.push(dispatch(loadSingleBlog(params.id)));
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
    user: state.auth.user,
    newDataAvailable: state.sessions.newDataAvailable,
    blogs: state.blogs ? state.blogs.singleData : null,
  }),
  dispatch => bindActionCreators({ loadComments, loadSingleBlog }, dispatch),
)
export default class BlogViewer extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object,
    blogs: PropTypes.arrayOf(PropTypes.object),
    loadComments: PropTypes.func.isRequired,
    loadSingleBlog: PropTypes.func.isRequired,
    className: PropTypes.string,
    params: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: null,
    blogs: [],
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadDataIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  reloadDataIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadSingleBlog(this.props.params.id);
      this.props.loadComments(this.props.params.id);
    }
  };
  render() {
    const {
      user,
      newCommentBeingCreated,
      blogs,
      loadComments,
      loadSingleBlog,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const blog = blogs[this.props.params.id];

    if (!blog) {
      return <NotFound />;
    }

    return (
      <div className={getClassName('pages__container')}>
        <Helmet title={blog ? blog.title : 'Blog Viewer'} />
        <BlogRenderer
          showEditLink={user && user.admin}
          centered={
            blog.tags ? HelperFunctions.includes(blog.tags, 'travel') : false
          }
          blog={blog}
        />
        <CommentArea params={this.props.params} />
      </div>
    );
  }
}
