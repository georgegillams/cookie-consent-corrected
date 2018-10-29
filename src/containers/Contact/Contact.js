import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  TextLink,
  Section,
  SubSection,
  ArticleCard,
  CARD_LAYOUTS,
  Button
} from 'components';
// import contactFile from "./contact.vcf";
import { cssModules } from 'bpk-react-utils';
import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

export default class Contact extends Component {
  state = {
    showKitten: false
  };

  handleToggleKitten = () =>
    this.setState({ showKitten: !this.state.showKitten });

  render() {
    return (
      <div
        className={[
          getClassName('pages__container'),
          getClassName('pages__container--centered')
        ].join(' ')}
      >
        <Helmet title="Contact" />
        <Section name="Get in touch">
          <div
            style={{ paddingTop: '1rem' }}
            className={getClassName('pages__compact-card-container')}
          >
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/nmkJVkO.png"
              href="https://www.fb.com/george333123"
              title="Facebook"
              tallLayout
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/54unoGD.png"
              href="mailto:g@georgegillams.co.uk"
              title="Email"
              tallLayout
            >
              <Section>g@georgegillams.co.uk</Section>
            </ArticleCard>
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/9hcLfgF.png"
              href="tel:+447867592615"
              title="Phone"
              tallLayout
            >
              <Section>+44 78675 92615</Section>
            </ArticleCard>
          </div>
          <br />
          <br />
          <Button
            hrefExternal
            href="https://www.dropbox.com/s/aj9wjgotkldd18j/georgegillams.vcf?dl=1"
          >
            Download contact
          </Button>
          <br />
          <br />
          <SubSection
            className={getClassName('pages__card')}
            noAnchor
            name="Questions about Black Panther should be emailed to me using WhatsApp 🤦‍"
          >
            <TextLink external href="https://youtu.be/0vL4HLTZQ_Q?t=29">
              Context{" "}
            </TextLink>
          </SubSection>
          {/* <br />
        <a
          href="https://www.fb.com/george333123"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Facebook george333123" link />
        </a>
        <a
          href="mailto:g@georgegillams.co.uk"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Email g@georgegillams.co.uk" link />
        </a>
        <a href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <SubSection noAnchor name="Call +44 (0) 786759 2615" link />
        </a>
      <a
          href="https://georgegillams.typeform.com/to/oBmiJZ"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Contact me online" link />
        </a>   */}
        </Section>
      </div>
    );
  }
}
