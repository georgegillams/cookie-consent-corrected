import React from 'react';
import PropTypes from 'prop-types';
import BpkTextArea from 'bpk-component-textarea';
import { CodeInline, Button } from '../index';
import { cssModules } from 'bpk-react-utils';

import STYLES from './comments.scss';

const getClassName = cssModules(STYLES);

class CommentInput extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onCommentChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newCommentBeingCreated: PropTypes.bool.isRequired,
    submitButtonText: PropTypes.string
  };

  static defaultProps = {
    submitButtonText: 'Submit comment'
  };

  constructor(props) {
    super(props);
  }

  onCommentChanged = event => {
    const newComment = JSON.parse(JSON.stringify(this.props.comment));
    newComment.comment = event.target.value;
    this.props.onCommentChanged(newComment);
  };

  render() {
    const {
      pageId,
      className,
      centered,
      comment,
      onCommentChanged,
      onSubmit,
      newCommentBeingCreated,
      submitButtonText,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    const textBoxClassNameFinal = [getClassName('comments__component')];
    textBoxClassNameFinal.push(getClassName('comments__component__text-box'));

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <br />
        <div>
          <BpkTextArea
            className={textBoxClassNameFinal.join(' ')}
            id="comment"
            name="Comment"
            value={comment.comment}
            onChange={this.onCommentChanged}
            placeholder="Your comment(s)"
          />
          <br />
          {`Comments support **`}
          <span style={{ fontWeight: 'bold' }}>bold</span>
          {"**, _"}
          <span style={{ fontStyle: 'italic' }}>italic</span>
          {"_, ~"}
          <span style={{ textDecoration: 'line-through' }}>strikethrough</span>
          {"~ and `"}
          <CodeInline>code</CodeInline>
          {"`"}
          <br />
          <br />
          <Button
            className={getClassName('comments__component')}
            onClick={onSubmit}
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    );
  }
}

CommentInput.propTypes = {
  centered: PropTypes.bool,
  pageId: PropTypes.number.isRequired,
  className: PropTypes.string
};

CommentInput.defaultProps = {
  centered: false,
  className: null
};

export default CommentInput;
