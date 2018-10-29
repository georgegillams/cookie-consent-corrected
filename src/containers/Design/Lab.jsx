/* eslint-disable */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Section, Button, SubSection, bpkDemo } from 'components';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const ButtonDemo = bpkDemo(Button, 'Button', 'na', {
  onClick: HelperFunctions.evalCompat('() => { alert("Button clicked"); }'),
  children: 'This is a button',
});

class Lab extends Component {
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
        <Helmet title="Lab" />
        <Section name="Lab">
          <SubSection noAnchor name="Nothing in progress at the moment" />
        </Section>
      </div>
    );
  }
}

export default Lab;
