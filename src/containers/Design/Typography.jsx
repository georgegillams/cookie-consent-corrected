/* eslint-disable */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Section, SubSection, bpkDemo } from 'components';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const SectionDemo = bpkDemo(Section, 'Section', 'na', {
  name: 'Section name',
  children: 'Some section content',
  noPadding: true,
  noAnchor: true,
});
const SubSectionDemo = bpkDemo(SubSection, 'SubSection', 'na', {
  name: 'Sub-section name',
  children: 'Some sub-section content',
  noPadding: true,
  noAnchor: true,
});

class Typography extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const demoClassName = getClassName('pages__bpk-demo');

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Typography" />
        <Section name="Typography">
          <SubSection noAnchor name="Section">
            <SectionDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Subsection">
            <SubSectionDemo className={demoClassName} />
          </SubSection>
        </Section>
      </div>
    );
  }
}

export default Typography;
