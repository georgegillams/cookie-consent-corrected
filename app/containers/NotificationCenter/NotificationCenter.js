import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection } from 'components/Typography';
import NotificationCollection from 'components/Notifications';
import LoadingIndicator from 'components/LoadingIndicator';
import 'containers/pages.scss';

const getClassName = c => c;

export default class NotificationCenter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentWillMount = () => {
    this.props.loadNotifications();
  };

  render() {
    const {
      loading,
      error,
      notifications,
      loadNotifications,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoadingIndicator loading={loading} error={error}>
          {notifications && (
            <NotificationCollection notifications={notifications} />
          )}
        </LoadingIndicator>
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  notifications: PropTypes.object,
  loadNotifications: PropTypes.func.isRequired,
  className: PropTypes.string,
};
