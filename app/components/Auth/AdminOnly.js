import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from '../';

class BlogsList extends Component {
  render() {
    const { user, children } = this.props;

    if (!user || !user.admin) {
      return (
        <Section name="You need to log in as an admin to view this page">
          <TextLink to="/account">Login</TextLink>
        </Section>
      );
    }

    return children;
  }
}

BlogsList.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlogsList;
