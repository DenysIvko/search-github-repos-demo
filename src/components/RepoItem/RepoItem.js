import React, { memo } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'utils/format-number/format-number';

import './RepoItem.scss';

const RepoItem = (props) => {
  return (
    <div className="RepoItem__container">
      <div className="RepoItem__name">
        <a href={props.url}>{props.name}</a>
      </div>
      <div className="RepoItem__counter-container">
        <i className="RepoItem__icon RepoItem__icon--star" />
        <span>{formatNumber(props.starsCount)}</span>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  starsCount: PropTypes.number.isRequired
};

export default memo(RepoItem);
