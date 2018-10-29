import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { createUser, checkUnameTaken } from 'redux/modules/auth';
import {
  CookiesOnly,
  TextLink,
  NotificationComp,
  SignUpForm,
  Section,
} from 'components';

@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    registeringError: state.auth.registeringError,
    registered: state.auth.registered,
    unameTakens: state.auth.unameTakens || {},
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({ checkUnameTaken, createUser }, dispatch),
)
export default class SignUp extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    registeringError: PropTypes.object.isRequired,
    unameTakens: PropTypes.arrayOf(PropTypes.object).isRequired,
    registered: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newUser: { uname: '', name: '', email: '', password: '' },
    };
  }

  updateNewUser = newValue => {
    this.setState({ newUser: newValue });
    if (this.props.unameTakens[newValue.uname] === undefined) {
      console.log(`checking uname`, newValue.uname);
      this.props.checkUnameTaken(newValue.uname);
    }
  };

  handleSubmit = () => {
    this.props.createUser(this.state.newUser);
  };

  render() {
    const {
      registered,
      registeringError,
      newDataAvailable,
      unameTakens,
      ...rest
    } = this.props;

    return (
      <CookiesOnly>
        <div className="container">
          <Section name="SignUp" />
          <Helmet title="Signup" />

          {registered && (
            <NotificationComp type="success">
              {'Registration successful. [You can now login](/account)'}
            </NotificationComp>
          )}
          {unameTakens[this.state.newUser.uname] && (
            <NotificationComp type="error">
              {`Username ${this.state.newUser.uname} is already taken.`}
            </NotificationComp>
          )}
          {registeringError && (
            <NotificationComp type="error">
              {registeringError.reason}
            </NotificationComp>
          )}
          <SignUpForm
            newUser={this.state.newUser}
            onDataChanged={this.updateNewUser}
            onSubmit={this.handleSubmit}
          />
          <br />
          <TextLink href="/account">Login </TextLink>
        </div>
      </CookiesOnly>
    );
  }
}
