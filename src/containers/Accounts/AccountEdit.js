import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  update as updateUser,
} from 'redux/modules/auth';
import {
  LoggedInOnly,
  NotificationComp,
  SignUpForm,
  Section,
} from 'components';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

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
    updated: state.auth.updated,
    updateError: state.auth.updateError,
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({ updateUser }, dispatch),
)
export default class AccountEdit extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updated: PropTypes.bool.isRequired,
    updateError: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newUser: props.user,
    };
  }

  updateNewUser = newValue => {
    this.setState({ newUser: newValue });
  };

  handleSubmit = () => {
    this.props.updateUser(this.state.newUser);
  };

  render() {
    const { updateError, updated, updateUser, user, ...rest } = this.props;

    return (
      <div className="container">
        <Section name="Edit account" />
        <Helmet title="Edit account" />

        {updated && (
          <NotificationComp type="success">
            Details successfully updated
          </NotificationComp>
        )}
        {updateError && (
          <NotificationComp type="error">{updateError.reason}</NotificationComp>
        )}
        <LoggedInOnly user={user}>
          <SignUpForm
            newUser={this.state.newUser}
            onDataChanged={this.updateNewUser}
            onSubmit={this.handleSubmit}
            passwordNotRequired={true}
            submitButtonText="Save"
          />
        </LoggedInOnly>
      </div>
    );
  }
}
