import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { TextLink, Section, PhotoGallery } from 'components';
// import contactFile from "./contact.vcf";
import { cssModules } from 'bpk-react-utils';
import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

export default class Contact extends Component {
  state = {};

  render() {
    return (
      <div
        className={`${getClassName('pages__container')} ${getClassName(
          'pages__container--centered'
        )}`}
      >
        <Helmet title="About" />
        <Section name="Hi! I'm George.">
          I&apos;m an open-source software engineer at{" "}
          <TextLink external href="https://www.skyscanner.net/">
            Skyscanner{" "}
          </TextLink>
          , passionate about design, <TextLink href="/travel">travel</TextLink>{" "}
          and photography, and have an unsatisfiable hunger for learning. When
          I&apos;m not internationally photobombing unsuspecting strangers
          I&apos;m based somewhere between Southampton and London.
          <br />
          <br />I enjoy getting outdoors and trying new things, and completed my
          5th <TextLink href="/blog/tough-mudder">Tough Mudder</TextLink> in May
          2018. I also try to squeeze in as much volunteering as I can, so you
          may find me dressed as a{" "}
          <TextLink external href="https://helpforheroes.org.uk/">
            Help for Heroes{" "}
          </TextLink>{" "}
          bear, reviewing content for{" "}
          <TextLink external href="https://b-eat.co.uk/">
            Beat{" "}
          </TextLink>
          , or submitting PR's to{" "}
          <TextLink external href="https://github.com/mozilla">
            Mozilla &apos;s open-source{" "}
          </TextLink>
          . I look forward to doing more of all that when I finish my Masters.
          <br />
          <br />I recently got engaged to my wonderful fiancée in{" "}
          <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and live
          with her and Tigger the cat.
          <br />
          <br />
          <div className={getClassName('pages__photo-gallery-container')}>
            <PhotoGallery
              className={getClassName('pages__photo-gallery')}
              images={[
                'https://i.imgur.com/EPfA1yI.png', // engaged
                'https://i.imgur.com/eldzRhk.jpg', // us
                'https://i.imgur.com/n8JZuqv.jpg', // tiggs
                'https://i.imgur.com/mvvDmiL.jpg' // tm
              ]}
            />
          </div>
          <br />
          <br />
          This site is built in React and hosted on Heroku where I have a Redis
          database provisioned. Redux is used to invoke API functions when pages
          are server-side rendered, and also when calls are made from the
          browser.
          <br />I use this site to experiment with things, share stuff I've
          figured out, and allow people to reach-out to me. So if you're
          interested in anything I do,{" "}
          <TextLink href="/contact">get in touch</TextLink>!
        </Section>
      </div>
    );
  }
}
