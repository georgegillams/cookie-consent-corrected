import React from 'react';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'helpers/time';
import { Section } from '../';

const APIEntity = () => {
  const { entityType, entity } = this.props;
  const { id, timestamp, lastUpdatedTimestamp, deleted, authorId } = entity;

  return (
    <Section name={`${entityType || 'Entity'} ${id}`}>
      {`Created ${timestamp}`}
      <br />
      {`Deleted ${deleted}`}
      <br />
      {`Created by ${authorId}`}
      <br />
      {`Last updated: ${getTimeDifference(
        lastUpdatedTimestamp,
      )} (${lastUpdatedTimestamp})`}
    </Section>
  );
};

APIEntity.propTypes = {
  entity: PropTypes.object.isRequired,
  entityType: PropTypes.String,
};

APIEntity.defaultProps = {
  entityType: null,
};

export default APIEntity;
