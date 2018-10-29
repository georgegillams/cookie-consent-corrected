import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isNotificationsLoaded,
  load as loadNotifications,
  remove as deleteNotification,
  create as createNotification,
} from 'redux/modules/notifications';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  AdminOnly,
  Loading,
  TagFilter,
  Button,
  NotificationComp,
  APIEntity,
  CreateNotificationForm,
} from 'components';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isNotificationsLoaded(getState())) {
        promises.push(dispatch(loadNotifications()));
      }
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    notifications: state.notifications ? state.notifications.data : null,
    user: state.auth.user,
  }),
  dispatch =>
    bindActionCreators(
      { createNotification, deleteNotification, loadNotifications },
      dispatch,
    ),
)
export default class Notifications extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object),
    deleteNotification: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    loadNotifications: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      newNotification: { type: '', message: '' },
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadNotificationsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadNotificationsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadNotifications();
    }
  };

  createNotification = () => {
    this.props.createNotification(this.state.newNotification);
  };

  render() {
    const {
      user,
      notifications,
      deleteNotification,
      createNotification,
      loadNotifications,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!notifications) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Notifications" />
        <AdminOnly user={user}>
          <div>
            <CreateNotificationForm
              notification={this.state.newNotification}
              onSubmit={this.createNotification}
              onDataChanged={newValue => {
                this.setState({ newNotification: newValue });
              }}
            />
            {`Notifications: ${notifications.length}`}
            <br />
            <br />
            {notifications &&
              notifications.map(notification => (
                <div>
                  <APIEntity entityType="Notification" entity={notification} />
                  {`Author ${notification.authorId}`}
                  <br />
                  <NotificationComp type={notification.type}>
                    {notification.message}
                  </NotificationComp>
                  <br />
                  {!notification.deleted && (
                    <Button
                      destructive
                      onClick={() => {
                        deleteNotification(notification);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
