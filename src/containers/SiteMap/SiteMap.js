import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  isLoaded as isBlogsLoaded,
  load as loadBlogs,
} from 'redux/modules/blogs';
import { asyncConnect } from 'redux-async-connect';
import { SubSection, TextLink } from 'components';
import { NON_EMOJI_REGEX } from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';
import redirects from '../../redirects';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isBlogsLoaded(getState())) {
        promises.push(dispatch(loadBlogs()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    blogs: state.blogs ? state.blogs.data : null,
  }),
  dispatch => bindActionCreators({ loadBlogs }, dispatch),
)
export default class SiteMap extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    loadBlogs: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadDataIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadDataIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadBlogs();
    }
  };

  render() {
    const { blogs, loadBlogs, className, ...rest } = this.props; // eslint-disable-line no-shadow

    if (!blogs || blogs.length < 1) {
      return null;
    }

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="SiteMap" />
        <div>
          <SubSection
            noAnchor
            className={getClassName('pages__site-map-item')}
            name="Research 📝"
          >
            <TextLink href="/research">Research</TextLink>
          </SubSection>
          <SubSection
            noAnchor
            className={getClassName('pages__site-map-item')}
            name="Technical 🕹"
          >
            <TextLink href="/technical-overview">Technical overview</TextLink>
          </SubSection>
          <SubSection
            noAnchor
            className={getClassName('pages__site-map-item')}
            name="Contribute 😇"
          >
            <TextLink href="/contribute">Contribute</TextLink>
          </SubSection>
        </div>
      </div>
    );
  }
}
