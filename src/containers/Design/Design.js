import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { Section, TextLink, ArticleCard, CARD_LAYOUTS } from 'components';
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

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({}, dispatch),
)
export default class Design extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { newDataAvailable, user, ...rest } = this.props;

    return (
      <div className="container">
        <Helmet title="Design" />
        <Section name="Design">
          This is a page all about the design of this website. It&apod;s mainly
          here for my benefit, but since you're here you might as well have a
          look around.
          <br />
          <br />
          <div className={getClassName('pages__compact-card-container')}>
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/design/privacy-policy"
              title="Privacy policy"
              tallLayout
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/design/colours"
              title="Colours"
              tallLayout
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/design/components"
              title="Components"
              tallLayout
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/design/typography"
              title="Typography"
              tallLayout
            />
          </div>
        </Section>
      </div>
    );
  }
}
