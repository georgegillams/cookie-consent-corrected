import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, SubSection, TextLink } from '../../components';

import STYLES from './not-found.scss';

const getClassName = c => c;

class NotFoundPage extends Component {
  // componentDidMount() {
  //   const url = this.props.apiUrl;
  //   Request.get(url)
  //     .then(response => {
  //       this.setState({
  //         result: JSON.stringify(response.currently.summary),
  //       });
  //     })
  //     .catch(error => {});
  // }

  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('not-found__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <Section className={getClassName('not-found__container')} name="Oops.">
          <SubSection noAnchor>
            The page you&apos;re looking for doesn&apos;t exist, or you
            don&apos;t have permission to view it.
            <br />
            Maybe the <TextLink href="/site-map">sitemap</TextLink> can help
          </SubSection>
        </Section>
      </main>
    );
  }
}

NotFoundPage.propTypes = {
  className: PropTypes.string,
};

NotFoundPage.defaultProps = {
  className: null,
};

export default NotFoundPage;
