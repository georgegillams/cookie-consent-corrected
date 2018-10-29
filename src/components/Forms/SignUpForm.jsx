import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { TextLink, Button } from '../index';
import { cssModules } from 'bpk-react-utils';
import {
  NAME_REGEX,
  UNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from 'helpers/constants';

import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);

class SignUpForm extends React.Component {
  static propTypes = {
    newUser: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    centered: PropTypes.bool,
    pageId: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    centered: false,
    submitButtonText: null,
    className: null,
  };

  constructor(props) {
    super(props);
  }

  onNameChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.newUser));
    newValue.name = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onUnameChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.newUser));
    newValue.uname = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onEmailChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.newUser));
    newValue.email = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onPasswordChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.newUser));
    newValue.password = event.target.value;
    this.props.onDataChanged(newValue);
  };

  render() {
    const {
      className,
      newUser,
      onDataChanged,
      onSubmit,
      submitButtonText,
      passwordNotRequired,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <label htmlFor="name" className={getClassName('forms__label')}>
          Name
        </label>
        <BpkInput
          className={getClassName('forms__component')}
          valid={newUser.name && newUser.name.match(NAME_REGEX)}
          id="name"
          name="name"
          value={newUser.name}
          onChange={this.onNameChanged}
          placeholder="name"
        />
        <label htmlFor="uname" className={getClassName('forms__label')}>
          User name
        </label>
        <BpkInput
          className={getClassName('forms__component')}
          valid={newUser.uname && newUser.uname.match(UNAME_REGEX)}
          id="uname"
          name="uname"
          value={newUser.uname}
          onChange={this.onUnameChanged}
          placeholder="user name (public)"
        />
        <label htmlFor="email" className={getClassName('forms__label')}>
          Email
        </label>
        <BpkInput
          className={getClassName('forms__component')}
          valid={newUser.email && newUser.email.match(EMAIL_REGEX)}
          id="email"
          name="email"
          value={newUser.email}
          onChange={this.onEmailChanged}
          placeholder="email"
        />
        <label htmlFor="password" className={getClassName('forms__label')}>
          Password
        </label>
        <BpkInput
          className={getClassName('forms__component')}
          type={INPUT_TYPES.password}
          valid={newUser.password && newUser.password.match(PASSWORD_REGEX)}
          id="password"
          name="password"
          value={newUser.password}
          onChange={this.onPasswordChanged}
          placeholder="password"
        />
        <br />
        <Button
          className={getClassName('forms__component')}
          onClick={onSubmit}
          disabled={
            !newUser.name ||
            !newUser.name.match(NAME_REGEX) ||
            !newUser.uname ||
            !newUser.uname.match(UNAME_REGEX) ||
            !newUser.email ||
            !newUser.email.match(EMAIL_REGEX) ||
            (!passwordNotRequired &&
              (!newUser.password || !newUser.password.match(PASSWORD_REGEX)))
          }
        >
          {submitButtonText || 'Register'}
        </Button>
      </div>
    );
  }
}

export default SignUpForm;
