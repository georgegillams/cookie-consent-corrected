import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkText from 'bpk-component-text';
import YoutubeEmbedVideo from 'youtube-embed-video';
import BpkImage, {
  withLoadingBehavior,
  withLazyLoading,
} from 'bpk-component-image';
import scrollIntoView from 'scroll-into-view';
import {
  citation,
  References,
  REFERENCE_STYLES,
} from 'react-component-academic-reference';
import { cssModules } from 'bpk-react-utils';
import {
  TextLink,
  Quote,
  SubSection,
  Code,
  CodeInline,
  CodeBashArrow,
} from 'components';
import HelperFunctions from 'helpers/HelperFunctions';

import STYLES from './blog-viewer.scss';
import PAGE_STYLES from '../../containers/pages.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const MD_LINK_REGEX = /([^]*)\[([^\[\]]*)\]\(([^\(\)]*)\)([^]*)/gi;
const MD_SECTION_REGEX = /([^]*)# ([^\n]+)\n([^]*)/gi;
const MD_SUBSECTION_REGEX = /([^]*)## ([^\n]+)\n([^]*)/gi;
const MD_SUBSUBSECTION_REGEX = /([^]*)### ([^\n]+)\n([^]*)/gi;
const MD_BLOCK_CODE_REGEX = /([^]*)```\(([^\(\)]*)\)\(([^\(\)]*)\)\n([.\s\S]*)\n```([^]*)/gi;
const MD_IMAGE_REGEX = /([^]*)!\[([^\[\]]*)\]\(([^\(\)]*)\)([^]*)/gi;
const MD_LAZY_LOAD_IMAGE_REGEX = /([^]*)!\[([0-9]+)x([0-9]+)\]\[([^\[\]]*)\]\(([^\(\)]*)\)([^]*)/gi;
const MD_LINK_BIG_REGEX = /([^]*)!ssLink\[([^\[\]]*)\]\(([^\(\)]*)\)([^]*)/gi;
const MD_YOUTUBE_REGEX = /([^]*)!yt\[([^\[\]]*)\]\(([^\(\)]*)\)([^]*)/gi;
const MD_STRIKETHROUGH_REGEX = /([^]*)~([^~]*)~([^]*)/gi;
const MD_INLINE_CODE_REGEX = /([^]*)`([^`]*)`([^]*)/gi;
const MD_BOLD_REGEX = /([^]*)\*\*([^\*]*)\*\*([^]*)/gi;
const MD_QUOTATION_REGEX = /([^]*)\>([^\>\<]*)\<([^]*)/gi;
const MD_CITATION_REGEX = /([^]*)!cite\(([^\(\)]*)\)([^]*)/gi;
const MD_REFERENCES_REGEX = /([^]*)!printReferences\(\)([^]*)/gi;
const MD_FOOTNOTE_1_REGEX = /([^]*)!footnote\(([0-9]+)\)([^]*)/gi;
const MD_FOOTNOTE_2_REGEX = /([^]*)!footnote\[([0-9]+)\]\(([^\(\)]+)\)([^]*)/gi;

// This component works recursively. Each time it checks for a feature (such as a link, stikethrough etc)
// At each stage, if it finds one it renders the appropriate component, passing the surrounding text to
// another instance of BlogPreviewContent. if no such feature is found, the content is simply rendered.

class RecursiveWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      depth,
      content,
      noAnchor,
      light,
      references,
      elementClassName,
    } = this.props;

    // console.log("recursing");
    // return <div>RECURSING</div>;
    return (
      <BlogPreviewContent
        depth={depth ? depth + 1 : 1}
        noAnchor={noAnchor}
        light={light}
        references={references}
        elementClassName={elementClassName}
        content={content}
      />
    );
  }
}

class BlogPreviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      content,
      className,
      elementClassName,
      light,
      noAnchor,
      references,
      supportedFeatures,
      ...rest
    } = this.props;

    const classNameFinal = [getClassName('article-date__date')];
    if (className) {
      classNameFinal.push(className);
    }

    const elementClassNameFinal = [getClassName('blog-viewer__element')];
    if (elementClassName) {
      elementClassNameFinal.push(elementClassName);
    }

    if (!content || content === '' || content === '\n') {
      return null;
    }

    const onSelection = (event, identifier) => {
      const reference = document.getElementById(identifier);
      if (!reference) return;

      scrollIntoView(reference, {
        time: 1000,
      });
    };

    const Cite = references ? citation(references, onSelection) : null;

    // If it's a footnote ref, return a superscript number:
    const mdFootNote1 = content.split(MD_FOOTNOTE_1_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'footnote') &&
      mdFootNote1.length > 2
    ) {
      const preFootnoteText = `${mdFootNote1.shift()}${mdFootNote1.shift()}`;
      const footnoteNumber = mdFootNote1.shift();
      const postFootnoteText = mdFootNote1.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preFootnoteText} />
          <BpkText textStyle="xs">
            <sup>{footnoteNumber}</sup>
          </BpkText>
          <RecursiveWrapper content={postFootnoteText} />
        </span>
      );
    }

    // If it's a footnote, return a superscript number:
    const mdFootNote2 = content.split(MD_FOOTNOTE_2_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'footnote') &&
      mdFootNote2.length > 3
    ) {
      // console.log(`mdFootNote2`, mdFootNote2);
      const preFootnoteText = `${mdFootNote2.shift()}${mdFootNote2.shift()}`;
      const footnoteNumber = mdFootNote2.shift();
      const footnoteValue = mdFootNote2.shift();
      const postFootnoteText = mdFootNote2.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preFootnoteText} />
          <BpkText textStyle="xs">
            <sup>{footnoteNumber}</sup>{' '}
            {<RecursiveWrapper content={footnoteValue} />}
          </BpkText>
          <RecursiveWrapper content={postFootnoteText} />
        </span>
      );
    }

    // If it's a quotation, return a Quote component:
    const mdQuotation = content.split(MD_QUOTATION_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'quotation') &&
      mdQuotation.length > 2
    ) {
      // console.log(`mdQuotation`, mdQuotation);
      const preQuotationText = `${mdQuotation.shift()}${mdQuotation.shift()}`;
      const quotation = mdQuotation.shift();
      const postQuotationText = mdQuotation.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preQuotationText} />
          <Quote className={null /* elementClassNameFinal.join(' ') */}>
            <RecursiveWrapper content={quotation} />
          </Quote>
          <RecursiveWrapper content={postQuotationText} />
        </span>
      );
    }

    // If it's a regular image, return an Image component:
    const mdImage = content.split(MD_IMAGE_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'image') &&
      mdImage.length > 3
    ) {
      // console.log(`mdImage`, mdImage);
      const preImageText = `${mdImage.shift()}${mdImage.shift()}`;
      const imageAltText = mdImage.shift();
      const imageSrc = mdImage.shift();
      const postImageText = mdImage.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preImageText} />
          <img
            className={getClassName('pages__image')}
            alt={imageAltText}
            src={imageSrc}
          />
          <RecursiveWrapper content={postImageText} />
        </span>
      );
    }

    // If it's a lazy-loaded image, return an Image component:
    const mdLazyLoadedImage = content.split(MD_LAZY_LOAD_IMAGE_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'image') &&
      mdLazyLoadedImage.length > 5
    ) {
      const preImageText = `${mdLazyLoadedImage.shift()}${mdLazyLoadedImage.shift()}`;
      const aspectX = parseInt(mdLazyLoadedImage.shift(), 10);
      const aspectY = parseInt(mdLazyLoadedImage.shift(), 10);
      const imageAltText = mdLazyLoadedImage.shift();
      const imageSrc = mdLazyLoadedImage.shift();
      const postImageText = mdLazyLoadedImage.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preImageText} />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText={imageAltText}
            width={aspectX}
            height={aspectY}
            src={imageSrc}
          />
          <RecursiveWrapper content={postImageText} />
        </span>
      );
    }

    // If it's a YouTube video, return a YoutubeEmbedVideo component:
    const mdYtVideo = content.split(MD_YOUTUBE_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'video') &&
      mdYtVideo.length > 3
    ) {
      const preLinkText = `${mdYtVideo.shift()}${mdYtVideo.shift()}`;
      const showSuggestions = mdYtVideo.shift() === 'true';
      const videoId = mdYtVideo.shift();
      const postLinkText = mdYtVideo.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preLinkText} />
          <YoutubeEmbedVideo
            className={getClassName('pages__image')}
            style={{ maxWidth: '100%', height: '45vw', maxHeight: '23rem' }}
            videoId={videoId}
            suggestions={showSuggestions}
          />
          <RecursiveWrapper content={postLinkText} />
        </span>
      );
    }

    // If it's a **BIG** hyperlink, return a <a>-wrapped Section component:
    const mdBigLink = content.split(MD_LINK_BIG_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'link') &&
      mdBigLink.length > 3
    ) {
      // console.log(`mdBigLink`, mdBigLink);
      const preLinkText = `${mdBigLink.shift()}${mdBigLink.shift()}`;
      const linkText = mdBigLink.shift();
      const linkRef = mdBigLink.shift();
      const postLinkText = mdBigLink.join('');
      const external = HelperFunctions.includes(linkRef, '.');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preLinkText} />
          <a
            className={getClassName('pages__link')}
            href={linkRef}
            rel={external ? 'noopener noreferrer' : ''}
            target={external ? '_blank' : ''}
          >
            <SubSection
              className={elementClassNameFinal.join(' ')}
              noAnchor
              name={linkText}
              link
            />
          </a>
          <RecursiveWrapper content={postLinkText} />
        </span>
      );
    }

    // If it's a hyperlink, return a TextLink component:
    const mdLink = content.split(MD_LINK_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'link') &&
      mdLink.length > 3
    ) {
      const preLinkText = `${mdLink.shift()}${mdLink.shift()}`;
      const linkText = mdLink.shift();
      const linkRef = mdLink.shift();
      const postLinkText = mdLink.join('');
      const external = HelperFunctions.includes(linkRef, '.');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preLinkText} />
          <TextLink external={external} inline href={linkRef}>
            <RecursiveWrapper content={linkText} />
            {external ? ' ' : ''}
          </TextLink>
          <RecursiveWrapper content={postLinkText} />
        </span>
      );
    }

    // If it's a subsubsection, return a bold title component:
    const mdSubSubSection = content.split(MD_SUBSUBSECTION_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'sectioning') &&
      mdSubSubSection.length > 2
    ) {
      const preSsSectionText = `${mdSubSubSection.shift()}${mdSubSubSection.shift()}`;
      const SsSectionText = mdSubSubSection.shift();
      const postSsSectionText = mdSubSubSection.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preSsSectionText} />
          <div
            style={{ fontWeight: 'bold' }}
            className={elementClassNameFinal.join(' ')}
          >
            <RecursiveWrapper content={SsSectionText} />
          </div>
          <br />
          <RecursiveWrapper content={postSsSectionText} />
        </span>
      );
    }

    // If it's bold, return a span with fontWeight: 'bold' component:
    const mdBold = content.split(MD_BOLD_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'bold') &&
      mdBold.length > 2
    ) {
      const preBoldText = `${mdBold.shift()}${mdBold.shift()}`;
      const boldText = mdBold.shift();
      const postBoldText = mdBold.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preBoldText} />
          <span
            style={{ fontWeight: 'bold' }}
            className={elementClassNameFinal.join(' ')}
          >
            <RecursiveWrapper content={boldText} />
          </span>
          <RecursiveWrapper content={postBoldText} />
        </span>
      );
    }

    // If it's a reference citation, return the Citation:
    const mdCitation = content.split(MD_CITATION_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'citation') &&
      mdCitation.length > 2
    ) {
      const preCitationText = `${mdCitation.shift()}${mdCitation.shift()}`;
      const referenceIdentifier = mdCitation.shift();
      const postCitationText = mdCitation.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preCitationText} />
          {Cite && <Cite identifier={referenceIdentifier} />}
          <RecursiveWrapper content={postCitationText} />
        </span>
      );
    }

    // If it's reference print-out, return a references section:
    const mdReferencesPrintout = content.split(MD_REFERENCES_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'citation') &&
      mdReferencesPrintout.length > 1
    ) {
      const preReferencesText = `${mdReferencesPrintout.shift()}${mdReferencesPrintout.shift()}`;
      const postReferencesText = mdReferencesPrintout.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preReferencesText} />
          {Cite && (
            <SubSection
              className={elementClassNameFinal.join(' ')}
              noAnchor={noAnchor}
              light={light}
              name="References"
            >
              <References
                className={[
                  getClassName('pages__references'),
                  elementClassNameFinal.join(' '),
                ].join(' ')}
                referenceStyle={REFERENCE_STYLES.harvard}
                references={references}
              />
            </SubSection>
          )}
          <RecursiveWrapper content={postReferencesText} />
        </span>
      );
    }

    // If it's a strikethrough, return a Strikethrough component:
    const mdStrikethrough = content.split(MD_STRIKETHROUGH_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'strikethrough') &&
      mdStrikethrough.length > 2
    ) {
      const preStrikeText = `${mdStrikethrough.shift()}${mdStrikethrough.shift()}`;
      const strikenText = mdStrikethrough.shift();
      const postStrikeText = mdStrikethrough.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preStrikeText} />
          <span
            style={{ textDecoration: 'line-through' }}
            className={elementClassNameFinal.join(' ')}
          >
            <RecursiveWrapper content={strikenText} />
          </span>
          <RecursiveWrapper content={postStrikeText} />
        </span>
      );
    }

    // If it's inline code, return a CodeInline component:
    const mdBlockCode = content.split(MD_BLOCK_CODE_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'blockCode') &&
      mdBlockCode.length > 4
    ) {
      const preInlineCodeText = `${mdBlockCode.shift()}${mdBlockCode.shift()}`;
      const language = mdBlockCode.shift();
      const githubLink = mdBlockCode.shift();
      const blockCode = mdBlockCode.shift();
      const postInlineCodeText = mdBlockCode.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preInlineCodeText} />
          <Code lang={language} githubUrl={githubLink}>
            {blockCode.split('\n\n').map(b => (
              <span>
                <CodeBashArrow />{' '}
                {b.split('\n').map(l => (
                  <span>
                    {l}
                    <br />
                  </span>
                ))}
                <br />
              </span>
            ))}
          </Code>
          <RecursiveWrapper content={postInlineCodeText} />
        </span>
      );
    }

    // If it's inline code, return a CodeInline component:
    const mdInlineCode = content.split(MD_INLINE_CODE_REGEX);
    if (
      HelperFunctions.includes(supportedFeatures, 'code') &&
      mdInlineCode.length > 2
    ) {
      const preInlineCodeText = `${mdInlineCode.shift()}${mdInlineCode.shift()}`;
      const inlineCode = mdInlineCode.shift();
      const postInlineCodeText = mdInlineCode.join('');
      return (
        <span className={classNameFinal.join(' ')} {...rest}>
          <RecursiveWrapper content={preInlineCodeText} />
          <CodeInline className={elementClassNameFinal.join(' ')}>
            <RecursiveWrapper content={inlineCode} />
          </CodeInline>
          <RecursiveWrapper content={postInlineCodeText} />
        </span>
      );
    }

    // Otherwise we just return the block of text:
    const contentParts = content.split('\n');

    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        {contentParts.map(
          s =>
            s === '' ? (
              <br />
            ) : (
              <p className={elementClassNameFinal.join(' ')}>{s}</p>
            ),
        )}
      </span>
    );
  }
}

BlogPreviewContent.propTypes = {
  references: PropTypes.object,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
  supportedFeatures: PropTypes.arrayOf(PropTypes.string),
};

BlogPreviewContent.defaultProps = {
  references: null,
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
  supportedFeatures: [
    'code',
    'blockCode',
    'bold',
    'italic',
    'strikethrough',
    'quotation',
    'link',
    'footnote',
    'image',
    'video',
    'citation',
    'sectioning',
  ],
};

export default BlogPreviewContent;
