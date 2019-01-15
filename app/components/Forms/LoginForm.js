import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { TextLink, Button } from '../index';

import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
  SORT_CODE_REGEX,
  MONZOME_LINK_REGEX,
} from 'helpers/constants';
import FormBuilder from './FormBuilder';

import './forms.scss';

class Login extends React.Component {
  static propTypes = {
    credentials: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, credentials, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={credentials}
        submitLabel={
          credentials.useMagicLink ? 'Request magic link 🧙‍♂️' : 'Login'
        }
        formFields={[
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,
            show: true,
          },
          {
            id: 'password',
            name: 'Password',
            validationRegex: PASSWORD_REGEX,
            showCondition: !credentials.useMagicLogin,
            show: !credentials.useMagicLink,
          },
          {
            id: 'useMagicLink',
            name: 'Use magic link',
            type: 'CHECKBOX',
            validationRegex: null,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default Login;
