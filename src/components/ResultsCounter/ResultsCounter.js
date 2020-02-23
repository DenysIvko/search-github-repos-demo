import React, { memo } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'utils/format-number/format-number';
import './ResultsCounter.scss';

const ResultsCounter = ({ counter }) => {
  return <span className="ResultsCounter__container">About {formatNumber(counter)} results</span>;
};

ResultsCounter.propTypes = {
  counter: PropTypes.number.isRequired
};

export default memo(ResultsCounter);
