import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationComp from './NotificationComp';

import './notification-collection.scss';
// import TYPO_STYLES from '../Typography/typography.scss';

export default class NotificationCollection extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object),
    load: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadNotificationsIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadNotificationsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.load();
    }
  };

  render() {
    const { notifications, load, className, ...rest } = this.props; // eslint-disable-line no-shadow

    const notificationsFiltered = (notifications || []).filter(
      notif => !notif.deleted,
    );

    if (!notificationsFiltered || notificationsFiltered.length < 1) {
      return null;
    }

    const outerClassNameFinal = ['notification-collection__container'];

    if (className) {
      outerClassNameFinal.push(className);
    }
    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        {notificationsFiltered.map(notif => (
          <NotificationComp
            className={'notification-collection__notification'}
            type={notif.type}
            deleted={notif.deleted}
          >
            {notif.message}
          </NotificationComp>
        ))}
      </div>
    );
  }
}
