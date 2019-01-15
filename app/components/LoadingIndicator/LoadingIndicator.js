import React from 'react';
import PropTypes from 'prop-types';
import { SubSection } from 'components/Typography';
import './style.scss';

const LoadingIndicator = props => {
  const { loading, error, children, ...rest } = props;

  if (!loading && !error) {
    return children;
  }

  return (
    <div className="loading-indicator__outer" {...rest}>
      <div className="loading-indicator">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      {error && (
        <SubSection
          noAnchor
          name="This is taking a while. Maybe something isn't quite right..."
        />
      )}
    </div>
  );
};

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node,
};

LoadingIndicator.defaultProps = {
  loading: true,
  error: null,
  children: null,
};

export default LoadingIndicator;
