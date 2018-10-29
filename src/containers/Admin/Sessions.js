import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoadedAll as isSessionsLoaded,
  load as loadSessions,
} from 'redux/modules/sessions';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { APIEntity, AdminOnly, Loading, TagFilter, Button } from 'components';
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

      if (!isSessionsLoaded(getState())) {
        promises.push(dispatch(loadSessions()));
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
    sessions: state.sessions ? state.sessions.allSessionData : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ loadSessions }, dispatch),
)
export default class Sessions extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object),
    loadSessions: PropTypes.func.isRequired,
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
      this.reloadSessionsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadSessionsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadSessions();
    }
  };

  render() {
    const { user, sessions, loadSessions, className, ...rest } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!sessions) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Sessions" />
        <AdminOnly user={user}>
          <div>
            {`Sessions: ${sessions.length}`}
            <br />
            <br />
            {sessions &&
              sessions.map(session => (
                <div>
                  <APIEntity entityType="Session" entity={session} />
                  {`Session key ${session.sessionKey}`}
                  <br />
                  {`Last active ${session.lastActive}`}
                  <br />
                  {`User ${session.userId}`}
                  <br />
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
