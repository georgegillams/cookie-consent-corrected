import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  Section,
  AdminOnly,
  TextLink,
  ArticleCard,
  CARD_LAYOUTS,
} from 'components';
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
export default class Admin extends Component {
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
        <Helmet title="Admin" />
        <AdminOnly user={user}>
          <Section name="This is where the magic happens 😜">
            <div className={getClassName('pages__compact-card-container')}>
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/site-settings"
                title="Site settings"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/blog"
                title="Blogs"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/users"
                title="Users"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/sessions"
                title="Sessions"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/comments"
                title="Page comments"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/notifications"
                title="Notifications"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/payments"
                title="Payments"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                href="https://dashboard.heroku.com/apps/georgegillams/settings"
                title="Heroku"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/gts"
                title="GTS"
                tallLayout
              />
            </div>
          </Section>
        </AdminOnly>
      </div>
    );
  }
}
