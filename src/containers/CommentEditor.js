import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { bindActionCreators } from "redux";
import { asyncConnect } from "redux-async-connect";
import {
  isSingleLoaded as isSingleCommentLoaded,
  loadSingle as loadSingleComment,
  save
} from "redux/modules/comments";
import { CommentInput } from "components";

// TODO Load data for given comment
@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      if (!isSingleCommentLoaded(getState())) {
        promises.push(dispatch(loadSingleComment(params.id)));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    comment: state.comments ? state.comments.singleData : null
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({ loadSingleComment, save }, dispatch)
)
export default class CommentEditor extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    loadSingleComment: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  };

  onCommentChanged = newValue => {
    this.setState({ comment: newValue });
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment
    };
  }

  handleSubmit = () => {
    this.props.save(this.state.comment);
  };

  render() {
    const params = this.props.params;

    if (!this.state.comment) {
      return null;
    }

    return (
      <div className="container">
        <h1>Comment editor - {this.state.comment.id}</h1>
        <Helmet title="CommentEditor" />

        <CommentInput
          comment={this.state.comment}
          onCommentChanged={this.onCommentChanged}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
