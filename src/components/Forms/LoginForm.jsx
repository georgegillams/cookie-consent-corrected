import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { TextLink, Button } from '../index';
import { cssModules } from 'bpk-react-utils';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'helpers/constants';

import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);

class LoginForm extends React.Component {
  static propTypes = {
    credentials: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmitMagic: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { useMagicLink: true };
  }

  onEmailChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.credentials));
    newValue.email = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onPasswordChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.credentials));
    newValue.password = event.target.value;
    this.props.onDataChanged(newValue);
  };

  render() {
    const {
      className,
      credentials,
      onDataChanged,
      onSubmitMagic,
      onSubmit,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <label htmlFor="email" className={getClassName('forms__label')}>
          Email
        </label>
        <BpkInput
          className={getClassName('forms__component')}
          valid={credentials.email.match(EMAIL_REGEX)}
          id="email"
          name="email"
          value={credentials.email}
          onChange={this.onEmailChanged}
          placeholder="email"
        />
        {!this.state.useMagicLink && (
          <label htmlFor="password" className={getClassName('forms__label')}>
            Password
          </label>
        )}
        {!this.state.useMagicLink && (
          <BpkInput
            className={getClassName('forms__component')}
            type={INPUT_TYPES.password}
            valid={credentials.password.match(PASSWORD_REGEX)}
            id="password"
            name="password"
            value={credentials.password}
            onChange={this.onPasswordChanged}
            placeholder="password"
          />
        )}
        <br />
        {this.state.useMagicLink && (
          <Button
            className={getClassName('forms__component')}
            disabled={!credentials.email.match(EMAIL_REGEX)}
            onClick={onSubmitMagic}
          >
            Send me a magic link 🧙‍♂️
          </Button>
        )}
        <br />
        {!this.state.useMagicLink && (
          <Button
            className={getClassName('forms__component')}
            disabled={
              !credentials.email.match(EMAIL_REGEX) ||
              !credentials.password.match(PASSWORD_REGEX)
            }
            onClick={onSubmit}
          >
            Login
          </Button>
        )}
        <br />
        <Button
          bouncy
          onClick={() => {
            this.setState({ useMagicLink: !this.state.useMagicLink });
          }}
        >
          {`Login using ${this.state.useMagicLink ? 'password' : 'magic link'}
          instead`}
        </Button>
        <br />
        <TextLink href="/sign-up">Need an account? Sign up </TextLink>
      </div>
    );
  }
}

LoginForm.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
};

LoginForm.defaultProps = {
  centered: false,
  className: null,
};

export default LoginForm;
