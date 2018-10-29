import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  verifyEmail,
  load as loadAuth,
} from 'redux/modules/auth';
import { Section } from 'components';

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      promises.push(dispatch(verifyEmail(params.key)));
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
    verifyingEmail: state.auth.verifyingEmail,
    emailVerified: state.auth.emailVerified,
    user: state.auth.user,
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({}, dispatch),
)
export default class VerifyEmail extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    verifyingEmail: PropTypes.bool.isRequired,
    emailVerified: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { user, emailVerified, verifyingEmail, ...rest } = this.props;

    return (
      <div className="container">
        <Section name="Verify email" />
        <Helmet title="Verify email" />
        {emailVerified && (
          <Section name="Thanks - Your email has been verified" />
        )}
        {!verifyingEmail && !emailVerified && <Section name="Invalid key." />}
      </div>
    );
  }
}
