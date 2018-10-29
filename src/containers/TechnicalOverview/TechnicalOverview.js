import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

export default class TechnicalOverview extends Component {
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
        <Helmet title="Technical overview" />
        <Section name="Coming soon…" />
      </div>
    );
  }
}
