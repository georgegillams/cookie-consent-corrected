/* eslint-disable */
import React from 'react';
import Helmet from 'react-helmet';
import { Section, ColourPalleteItem } from 'components';
import STYLES from '../pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

class Colours extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Colour pallete" />
        <Section name="Colour pallete">
          <div className={getClassName('pages__compact-card-container')}>
            <ColourPalleteItem colourName="Not black" colour="#1E1E1E" />
            <ColourPalleteItem colourName="Grey" colour="#343B49" />
            <ColourPalleteItem colourName="Blue" colour="#44AEFF" />
            <ColourPalleteItem colourName="Red" colour="#E02626" />
            <ColourPalleteItem colourName="Dark orchid" colour="#9932CC" />
            <ColourPalleteItem colourName="Hot pink" colour="#FF69B4" />
          </div>
        </Section>
      </div>
    );
  }
}

export default Colours;
