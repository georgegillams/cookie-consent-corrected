import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isAllLoaded as isUsersLoaded,
  loadAll as loadUsers,
} from 'redux/modules/auth';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  APIEntity,
  User,
  AdminOnly,
  Loading,
  TagFilter,
  Button,
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

      if (!isUsersLoaded(getState())) {
        promises.push(dispatch(loadUsers()));
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
    users: state.auth ? state.auth.data : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ loadUsers }, dispatch),
)
export default class Users extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    loadUsers: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadUsersIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadUsersIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadUsers();
    }
  };

  render() {
    const { user, users, loadUsers, className, ...rest } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!users) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Users" />
        <AdminOnly user={user}>
          <div>
            {`Users: ${users.length}`}
            <br />
            <br />
            {users &&
              users.map(user => (
                <div>
                  <APIEntity entityType="User" entity={user} />
                  <User user={user} showAdvancedInfo />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
