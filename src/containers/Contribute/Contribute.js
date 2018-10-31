import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login,
  logout,
  logoutAll,
  requestMagicLink,
} from 'redux/modules/auth';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { LoginForm, Section, Button } from 'components';
// import { CounterButton, GithubButton} from 'components';
import { ArticleCard, CARD_LAYOUTS } from 'components';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({}, dispatch),
)
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <div className={getClassName('pages__container')}>
        <Helmet title="Contribute" />
        <Section name="Contributing">
          I plan to make this venture fully open-source and license it under a
          suitable license.
          <br />
          <br />
          Once I have gained support and open-sourced this site, I will start
          working on an official proposal and proof-of-concept tooling.
          <br />
          <br />
          Looking forward to having you on board 😉
        </Section>
      </div>
    );
  }
}
