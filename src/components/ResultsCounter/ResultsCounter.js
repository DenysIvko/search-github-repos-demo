import React, { memo } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import './ResultsCounter.scss';

const formatNumber = (number) => numeral(number).format('0,0');

const ResultsCounter = ({ counter }) => {
  return <span className="ResultsCounter__container">About {formatNumber(counter)} results</span>;
};

ResultsCounter.propTypes = {
  counter: PropTypes.number.isRequired
};

export default memo(ResultsCounter);
