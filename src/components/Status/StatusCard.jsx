import React, { PropTypes } from 'react';
import { Status, ArticleCard, CARD_LAYOUTS, TextLink } from '../';
import { cssModules } from 'bpk-react-utils';

import STYLES from './status-card.scss';

const getClassName = cssModules(STYLES);

const StatusCard = props => {
  const { data, overallStatus, className, ...rest } = props;

  const classNameFinal = [getClassName('status-card__container')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <ArticleCard
        layout={CARD_LAYOUTS.narrowCompact}
        className={getClassName('status-card__card')}
      >
        <div className={getClassName('status-card__content-items')}>
          {data &&
            data.map(dataItem => (
              <div className={getClassName('status-card__content-item')}>
                {dataItem.status === 'complete' && (
                  <Status
                    type="SUCCESS"
                    className={getClassName('status-card__content-item-status')}
                  />
                )}
                {dataItem.status === 'incomplete' && (
                  <Status
                    type="WARN"
                    className={getClassName('status-card__content-item-status')}
                  />
                )}
                {dataItem.status === 'not_started' && (
                  <Status
                    type="ERROR"
                    className={getClassName('status-card__content-item-status')}
                  />
                )}
                {dataItem.item}
                <br />
                <br />
              </div>
            ))}
        </div>
      </ArticleCard>
      <Status
        shadow
        type={overallStatus}
        large
        className={getClassName('status-card__status')}
      />
    </div>
  );
};

StatusCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  overallStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
};

StatusCard.defaultProps = {
  className: null,
};

export default StatusCard;
