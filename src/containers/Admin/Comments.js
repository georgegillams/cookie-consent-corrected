import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  remove as deleteComment,
} from 'redux/modules/comments';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  APIEntity,
  AdminOnly,
  Loading,
  TagFilter,
  Button,
  Comment,
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

      if (!isCommentsLoaded(getState(), 'ALL')) {
        promises.push(dispatch(loadComments(null)));
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
    comments:
      state.comments && state.comments.data['ALL']
        ? state.comments.data['ALL']
        : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ deleteComment, loadComments }, dispatch),
)
export default class Comments extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
    deleteComment: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
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
      this.reloadCommentsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadCommentsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadComments(null);
    }
  };

  render() {
    const {
      user,
      comments,
      deleteComment,
      loadComments,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!comments) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Comments" />
        <AdminOnly user={user}>
          <div>
            {`Comments: ${comments.length}`}
            <br />
            <br />
            {comments &&
              comments.map(comment => (
                <div>
                  <APIEntity entityType="Comment" entity={comment} />
                  {`Page id ${comment.pageId}`}
                  <br />
                  {`Comment ${comment.comment}`}
                  <br />
                  <Comment
                    user={user}
                    comment={comment}
                    onCommentDeleted={deleteComment}
                  />
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
