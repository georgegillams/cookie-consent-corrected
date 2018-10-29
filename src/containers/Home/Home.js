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
        <div className={getClassName('pages__container--centered')}>
          <Section name="Cookie consent done right" />
        </div>
        <Section>
          Cookie consent on the web is a little broken. In the EU, websites that
          wish to use cookies must (by law) obtain consent from users first.
          Browsers leave the website entirely responsible for obtaining this
          consent and abiding by it. As a result, websites often look like this
          when first visited:
          <br />
          <br />
          <div className={getClassName('pages__container--centered')}>
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Existing system screenshot"
              width={1102}
              height={2146}
              src="https://i.imgur.com/WlfJetM.png"
            />
          </div>
          <br />
          This is an extreme example, and some websites actually take their
          responsibility very seriously. Many choose not to, however, and getting
          it right is not always trivial.
          <br />- Creating a compliant cookie “banner” can be expensive -
          especially for charities and non-profits.
          <br />- Cookie “banners” are often disruptive.
          <br />- They look different on every site, making the cognitive load
          on users huge.
          <br />- They often use dark-patterns - that is, they are designed to
          be difficult to understand and trick the user into clicking “Accept”.
          <br />- They don’t really put the consumer in control, as there are
          usually only 2 options - “Yes to all” or “Leave the site”.
          <br />- And most importantly, they don’t actually enforce anything! A
          website could choose not to honour your preferences, and ask the
          browser to store cookies regardless.
          <br />
          <br />I believe that people should have complete, accessible control
          over their cookies whatever website they visit, and I believe that
          right should extend beyond the EU. I, therefore, wish to propose a way
          of achieving this without relying on individual websites and
          legislation alone to protect users' privacy.
          <br />
        </Section>
        <Section name="A better way">
          I wish to propose a new standard by which users can have better
          control over cookies used on their devices. The standard will allow
          websites to inform browsers of their cookie requirements. The browser
          will then prompt the user for permission.
          <br />
          <br />
          <div className={getClassName('pages__container--centered')}>
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Proposed mechanism screenshot"
              width={1102}
              height={2170}
              src="https://i.imgur.com/rzVn7ve.png"
            />
          </div>
          <br />
          The advantages of this over the existing system are:
          <br />- Consistent UI. As the browser is asking every time, the
          language, options and appearance will always be the same.
          <br />- No conflict of interest - the browser will put you in control
          as they have nothing to gain from dark-patterns or trickery.
          <br />- The browser will actually have the control to enforce your
          preferences. A websites cookie can only be stored if the browser
          allows it.
          <br />- A user could configure default options for all new websites.
          If they do this, they will never be interrupted by a cookie alert
          again, and they will know that their chosen privacy settings are being
          applied everywhere they go.
        </Section>
        <Section name="Compliance by definition">
          Why would companies want to do this? Well, by making the browser
          responsible for obtaining consent to store cookies, every website
          would automatically be compliant with regulations in every region.
          This is especially beneficial to non-profits and small businesses.
        </Section>
        <div className={getClassName('pages__compact-card-container')}>
          <Helmet title="Home" />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            href="https://www.georgegillams.co.uk/contact"
            title="Get in touch"
            tallLayout
          />
        </div>
      </div>
    );
  }
}
