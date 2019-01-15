import React from 'react';
import PropTypes from 'prop-types';
import BpkCheckbox from 'bpk-component-checkbox';
import Button from '../Button';

import './graphic-content.scss';

const GraphicContent = props => {
  const {
    className,
    children,
    graphicContentInView,
    alwaysShowGraphicContent,
    onAlwaysShowChanged,
    onClick,
    ...rest
  } = props;

  const classNameFinal = ['graphic-content__outer-container'];
  if (className) {
    classNameFinal.push(className);
  }

  const contentContainerClassNames = ['graphic-content__content-container'];
  if (!graphicContentInView) {
    contentContainerClassNames.push([
      'graphic-content__content-container--hidden',
    ]);
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <div className={contentContainerClassNames.join(' ')}>{children}</div>
      {!graphicContentInView && (
        <div className={'graphic-content__warning-container'}>
          <div className={'graphic-content__warning-container__inner'}>
            <div className={'graphic-content__text'}>
              This image contains graphic content
            </div>
            <br />
            <Button onClick={onClick} className={'graphic-content__text'}>
              Show graphic content
            </Button>
            <br />
            <BpkCheckbox
              className={'graphic-content__text'}
              name="Always show graphic content"
              label="Always show graphic content"
              checked={alwaysShowGraphicContent}
              onChange={onAlwaysShowChanged}
            />
          </div>
        </div>
      )}
    </div>
  );
};

GraphicContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  graphicContentInView: PropTypes.bool,
  alwaysShowGraphicContent: PropTypes.bool,
  onClick: PropTypes.func,
  onAlwaysShowChanged: PropTypes.func,
};

GraphicContent.defaultProps = {
  className: null,
  graphicContentInView: false,
  alwaysShowGraphicContent: false,
  onClick: null,
  onAlwaysShowChanged: null,
};

export default GraphicContent;
