import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isSingleLoaded as isSingleBlogLoaded,
  loadSingle as loadSingleBlog,
  save as updateBlog,
  create as createBlog,
} from 'redux/modules/blogs';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  create as createComment,
  save as saveComment,
} from 'redux/modules/comments';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { BlogRenderer, BlogForm, AdminOnly } from 'components';
import { CommentArea } from 'containers';
import NotFound from '../NotFound/NotFound';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from './blog-editor.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      if (!isCommentsLoaded(getState())) {
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
  dispatch =>
    bindActionCreators(
      { updateBlog, createBlog, loadComments, loadSingleBlog },
      dispatch,
    ),
)
export default class BlogEditor extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object,
    blogs: PropTypes.arrayOf(PropTypes.object),
    updateBlog: PropTypes.func.isRequired,
    createBlog: PropTypes.func.isRequired,
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

    this.state = { editedBlog: props.blogs[props.params.id] || {} };
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

  onBlogEdited = newValue => {
    this.setState({ editedBlog: newValue });
  };

  onCreateBlog = () => {
    const blogToCreate = JSON.parse(JSON.stringify(this.state.editedBlog));
    blogToCreate.requestedId = blogToCreate.id;
    blogToCreate.id = null;
    this.props.createBlog(blogToCreate);
  };

  onUpdateBlog = () => {
    this.props.updateBlog(this.state.editedBlog);
  };

  render() {
    const {
      user,
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
        <Helmet title={blog ? blog.title : 'Blog editor'} />
        <AdminOnly user={user}>
          {blog && (
            <div className={getClassName('blog-editor')}>
              <BlogForm
                className={getClassName('blog-editor__component')}
                elementClassName={getClassName(
                  'blog-editor__component__editor-element',
                )}
                checkBoxElementClassName={getClassName(
                  'blog-editor__component__editor-element--checkbox',
                )}
                blog={blog}
                editedBlog={this.state.editedBlog}
                onBlogChanged={this.onBlogEdited}
                onCreateBlog={this.onCreateBlog}
                onUpdateBlog={this.onUpdateBlog}
              />
              {this.state.editedBlog.content &&
                this.state.editedBlog.content !== '' && (
                  <BlogRenderer
                    className={getClassName('blog-editor__component')}
                    elementClassName={getClassName(
                      'blog-editor__component__preview-element',
                    )}
                    blog={this.state.editedBlog}
                  />
                )}
            </div>
          )}
        </AdminOnly>
      </div>
    );
  }
}
