import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isGtsLoaded,
  load as loadGts,
  remove as deleteGts,
  create as createGts,
} from 'redux/modules/gts';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  AdminOnly,
  Loading,
  GTSEntity,
  CreateGTSForm,
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

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }
      if (!isGtsLoaded(getState())) {
        promises.push(dispatch(loadGts()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    gtsData: state.gts ? state.gts.data : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ createGts, deleteGts, loadGts }, dispatch),
)
export default class GTS extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    gtsData: PropTypes.arrayOf(PropTypes.object),
    deleteGts: PropTypes.func.isRequired,
    createGts: PropTypes.func.isRequired,
    loadGts: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      newGts: { destination: '', eta: '', emoji: '' },
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadGTSIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadGTSIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadGts();
    }
  };

  createGts = () => {
    this.props.createGts(this.state.newGts);
  };

  render() {
    const {
      user,
      gtsData,
      deleteGts,
      createGts,
      loadGts,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!gtsData) {
      return <p>NO GTS</p>;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="GTS" />
        <AdminOnly user={user}>
          <div>
            <CreateGTSForm
              gts={this.state.newGts}
              onSubmit={this.createGts}
              onDataChanged={newValue => {
                this.setState({ newGts: newValue });
              }}
            />
            <br />
            <br />
            {gtsData &&
              gtsData.map(gts => (
                <div>
                  <APIEntity entityType="GTS" entity={gts} />
                  <br />
                  <GTSEntity gts={gts} />
                  <br />
                  {!gts.deleted && (
                    <Button
                      destructive
                      onClick={() => {
                        deleteGts(gts);
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
