/* eslint-disable */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  AnimatedContent,
  Status,
  StatusCard,
  withGraphicContentBehaviour,
  TextLink,
  Logo,
  CodeBashArrow,
  ColourPalleteItem,
  Button,
  ArticleDate,
  CodeInline,
  Code,
  Quote,
  Tag,
  NotificationComp,
  ArticleCard,
  GraphicContent,
  Section,
  SubSection,
  bpkDemo,
} from 'components';
import { withLazyLoading } from 'bpk-component-image';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const GcbGraphicContent = withGraphicContentBehaviour(GraphicContent);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const LogoDemo = bpkDemo(Logo, 'Logo', 'na', { small: true, noPadding: true });
const ButtonDemo = bpkDemo(Button, 'Button', 'na', {
  onClick: HelperFunctions.evalCompat('() => { alert("Button clicked"); }'),
  children: 'This is a button',
});
const TextLinkDemo = bpkDemo(TextLink, 'TextLink', 'na', {
  href: 'https://www.gogle.com/',
  external: true,
  children: 'Google ',
});
const ArticleDateDemo = bpkDemo(ArticleDate, 'ArticleDate', 'na', {
  date: new Date(Date.now()),
  noPadding: true,
});
const CodeInlineDemo = bpkDemo(CodeInline, 'CodeInline', 'na', {
  children: 'inline code',
});
const CodeDemo = bpkDemo(Code, 'Code', 'na', {
  children: (
    <div>
      <CodeBashArrow />
      echo &quot;A block of code.&quot;
      <br />A block of code.
    </div>
  ),
});
const QuoteDemo = bpkDemo(Quote, 'Quote', 'na', {
  children: '"Make sure the world remembers your name" - anon.',
});
const TagDemo = bpkDemo(Tag, 'Tag', 'na', {
  onClick: HelperFunctions.evalCompat('() => { alert("Tag clicked"); }'),
  type: 'photography',
});
const NotificationDemo = bpkDemo(NotificationComp, 'NotificationComp', 'na', {
  type: 'warn',
  children: 'This is a `warn` notification that supports **markdown**',
});
// const LicenseInfoDemo = bpkDemo(LicenseInfo, 'LicenseInfo', 'na', {});
const ColourPalleteItemDemo = bpkDemo(
  ColourPalleteItem,
  'ColourPalleteItem',
  'na',
  { colour: '#44aeff', colourName: 'Blue' },
);
const ArticleCardDemo = bpkDemo(ArticleCard, 'ArticleCard', 'na', {
  fillImageSrc: 'http://placehold.it/1200x120/FF3F41/&text=image1',
  imageSrc: 'http://placehold.it/200x120/ffff&text=image2',
  title: 'Card example',
  light: true,
});
const GraphicContentDemo = bpkDemo(GraphicContent, 'GraphicContent', 'na', {
  onClick: HelperFunctions.evalCompat('() => { alert("Button clicked"); }'),
  onAlwaysShowChanged: HelperFunctions.evalCompat(
    '() => { alert("Always show changed"); }',
  ),
  children: '// Child element //',
});
const AnimatedContentDemo = bpkDemo(AnimatedContent, 'AnimatedContent', 'na', {
  children: '// Child element //',
});
const StatusDemo = bpkDemo(Status, 'Status', 'na', {
  type: 'SUCCESS',
  size: 'SMALL',
});
const StatusCardDemo = bpkDemo(StatusCard, 'StatusCard', 'na', {
  overallStatus: 'SUCCESS',
  data: [
    { item: 'Account information', status: 'complete' },
    { item: 'Professional profile', status: 'incomplete' },
    { item: 'Photo release', status: 'not_started' },
  ],
});

class Components extends Component {
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
        <Helmet title="Components" />
        <Section name="Components">
          <SubSection noAnchor name="Animated container">
            <AnimatedContentDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Button">
            <ButtonDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Status">
            <StatusDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Status">
            <StatusCardDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Card">
            <ArticleCardDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Code (block)">
            <CodeDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Code (inline)">
            <CodeInlineDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Colour pallete item">
            <ColourPalleteItemDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Date">
            <ArticleDateDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Graphic content">
            <GraphicContentDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Logo">
            <LogoDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Notification">
            <NotificationDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Quote">
            <QuoteDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Tag">
            <TagDemo className={demoClassName} />
          </SubSection>
          <SubSection noAnchor name="Text link">
            <TextLinkDemo className={demoClassName} />
          </SubSection>
          <Section name="Components with stateful HOCs">
            <SubSection noAnchor name="Animated container with HOC">
              <LlAnimatedContent>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '5rem',
                    backgroundColor: '#e02626',
                  }}
                />
              </LlAnimatedContent>
            </SubSection>
            <SubSection noAnchor name="Graphic content with HOC">
              <GcbGraphicContent>
                <img
                  style={{ width: '80%' }}
                  alt="test"
                  src="https://placehold.it/800x390/FF3F41/&text=image1"
                />
              </GcbGraphicContent>
            </SubSection>
          </Section>
        </Section>
      </div>
    );
  }
}

export default Components;
