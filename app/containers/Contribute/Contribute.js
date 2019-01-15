import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { LoginForm, Section, Button } from 'components';
// import { CounterButton, GithubButton} from 'components';
import { ArticleCard, CARD_LAYOUTS, TextLink } from 'components';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

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
          <TextLink
            external
            href="http://github.com/georgegillams/cookie-consent-corrected"
          >
            The GitHub repo for this site is here{' '}
          </TextLink>
          <br />
          Once I have gained more support and worked out a road-map, I will
          start working on an official proposal and proof-of-concept tooling.
          <br />
          <br />
          Looking forward to having you on board 😉
        </Section>
      </div>
    );
  }
}
