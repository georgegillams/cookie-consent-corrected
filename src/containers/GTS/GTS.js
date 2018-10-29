import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isLatestLoaded as isGtsLatestLoaded,
  loadLatest as loadGtsLatest,
} from 'redux/modules/gts';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  ArticleCard,
  Section,
  BlogsList,
  Loading,
  TagFilter,
  Tag,
  GTSEntity,
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

      if (!isGtsLatestLoaded(getState())) {
        promises.push(dispatch(loadGtsLatest()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    gtsData: state.gts ? state.gts.latestData : null,
  }),
  dispatch => bindActionCreators({ loadGtsLatest }, dispatch),
)
export default class GTS extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    gtsData: PropTypes.object,
    loadGtsLatest: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.reloadGtsIfNecessary();
    }, CHECK_FOR_NEW_CONTENT_INTERVAL);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadGtsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadGtsLatest();
    }
  };

  render() {
    const { gtsData, loadGtsLatest, className, ...rest } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [
      getClassName('pages__container'),
      getClassName('pages__container--centered'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Tracking" />
        {!gtsData && (
          <Section name="No live tracking currently available">
            <Section name="🗺" />
          </Section>
        )}
        {gtsData && <GTSEntity gts={gtsData} />}
      </div>
    );
  }
}
