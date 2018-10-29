import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isSingleLoaded as isSingleBlogLoaded,
  loadSingle as loadSingleBlog
} from 'redux/modules/blogs';
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  create as createComment,
  save as saveComment,
  remove as deleteComment
} from 'redux/modules/comments';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { BlogRenderer, Comments } from 'components';
import NotFound from '../NotFound/NotFound';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@connect(
  state => ({
    user: state.auth.user,
    newDataAvailable: state.sessions.newDataAvailable,
    // TODO REMOVE `LATEST` HACK
    comments: state.comments && state.comments.data ? state.comments.data : [],
    newCommentBeingCreated: state.comments.creating.newComment
  }),
  dispatch =>
    bindActionCreators(
      { deleteComment, loadComments, createComment, saveComment },
      dispatch
    )
)
export default class CommentArea extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    newCommentBeingCreated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    className: PropTypes.string,
    params: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: null,
    className: null
  };

  constructor(props) {
    super(props);

    this.state = {
      comments: this.getUpdatedComments(),
      newComment: { comment: '', pageId: this.props.params.id }
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadDataIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onNewCommentSubmit = () => {
    this.props.createComment(this.state.newComment);
  };

  onCommentSubmit = comment => {
    comment.comment = comment.newValue;
    this.stopEditComment(comment);
    this.props.saveComment(comment);
  };

  onCommentChanged = comment => {
    const updatedComments = JSON.parse(JSON.stringify(this.state.comments));
    for (let com = 0; com < updatedComments.length; com += 1) {
      if (updatedComments[com].id === comment.id) {
        updatedComments[com].newValue = comment.comment;
      }
    }
    this.setState({ comments: updatedComments });
  };

  onNewCommentChanged = newValue => {
    this.setState({ newComment: newValue });
  };

  onCommentDeleted = comment => {
    this.props.deleteComment(comment);
  };

  reloadDataIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadComments(this.props.params.id);
      this.setState({
        comments: this.getUpdatedComments()
      });
    }
  };

  getUpdatedComments = () => {
    //TODO Don't overwrite comments that are being edited
    const updatedComments = JSON.parse(
      JSON.stringify(this.props.comments[this.props.params.id])
    );
    updatedComments.forEach(com => (com.editing = false));
    return updatedComments;
  };

  setEditComment = (commentId, editing) => {
    const updatedComments = JSON.parse(JSON.stringify(this.state.comments));
    for (let com = 0; com < updatedComments.length; com += 1) {
      if (updatedComments[com].id === commentId) {
        updatedComments[com].editing = editing;
        if (editing) {
          updatedComments[com].newValue = `_edited:_ ${
            updatedComments[com].comment
          }`;
        }
      }
    }
    this.setState({
      comments: updatedComments
    });
  };

  startEditComment = comment => {
    this.setEditComment(comment.id, true);
  };

  stopEditComment = comment => {
    this.setEditComment(comment.id, false);
  };

  render() {
    const { user, newCommentBeingCreated, className, ...rest } = this.props; // eslint-disable-line no-shadow

    return (
      <div>
        <Comments
          newCommentBeingCreated={newCommentBeingCreated}
          user={user}
          comments={this.state.comments}
          onCommentStartEdit={this.startEditComment}
          onCommentEndEdit={this.endEditComment}
          newComment={this.state.newComment}
          onNewCommentChanged={this.onNewCommentChanged}
          onCommentChanged={this.onCommentChanged}
          onCommentSubmit={this.onCommentSubmit}
          onCommentDeleted={this.onCommentDeleted}
          onNewCommentSubmit={this.onNewCommentSubmit}
        />
      </div>
    );
  }
}
