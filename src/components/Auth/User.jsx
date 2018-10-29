import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from '../';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { welcomeMessage, user, showAdvancedInfo } = this.props;
    const { id, name, email, emailFingerprint, emailVerified, phone } = user;

    if (!user || !name) {
      return <Section name="Loading user info..." />;
    }

    return (
      <Section name={`${welcomeMessage || 'User'} ${id}`}>
        {`Name: ${name}`}
        <br />
        {`Email: ${email}`}
        <br />
        {`Phone: ${phone}`}
        <br />
        {showAdvancedInfo && `Email fingerprint: ${emailFingerprint}`}
        {showAdvancedInfo && <br />}
        {`Email verified: ${emailVerified}`}
        <br />
        <br />
      </Section>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  welcomMessage: PropTypes.String,
  showAdvancedInfo: PropTypes.bool,
};

User.defaultProps = {
  welcomMessage: null,
  showAdvancedInfo: false,
};

export default User;
