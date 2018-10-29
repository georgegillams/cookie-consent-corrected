import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from '../';

class LoggedInOnly extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, activityName, children } = this.props;

    if (!user) {
      return (
        <Section
          name={`You need to be logged in to ${activityName ||
            'view this content'}`}
        >
          <TextLink to="/sign-up">
            Register here - it's quick and easy.
          </TextLink>
        </Section>
      );
    }

    return children;
  }
}

LoggedInOnly.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoggedInOnly;
