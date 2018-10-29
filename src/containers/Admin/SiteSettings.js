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
import BpkCheckBox from 'bpk-component-checkbox';
import {
  APIEntity,
  User,
  AdminOnly,
  Loading,
  TagFilter,
  Button,
} from 'components';
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
export default class SiteSettings extends Component {
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

    this.state = { sessionDebugViews: null };
  }

  componentDidMount = () => {
    this.setState({
      sessionDebugViews:
        window.localStorage.getItem('showSessionDebugViews') === 'true',
    });
  };

  sessionDebugViewsChanged = event => {
    const newValue = event.target.checked;
    this.setState({ sessionDebugViews: newValue });
    if (newValue) {
      window.localStorage.setItem('showSessionDebugViews', 'true');
    } else {
      window.localStorage.removeItem('showSessionDebugViews');
    }
  };

  render() {
    const { user, className, ...rest } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="SiteSettings" />
        <AdminOnly user={user}>
          <div>
            <BpkCheckBox
              name="showSessionDebugViews"
              label="Show session debug views"
              checked={this.state.sessionDebugViews}
              onChange={this.sessionDebugViewsChanged}
            />
          </div>
        </AdminOnly>
      </div>
    );
  }
}
