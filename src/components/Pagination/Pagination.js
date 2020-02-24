import React, { memo } from 'react';
import PropTypes from 'prop-types';

import PaginateLetter from './PaginateLetter';
import paginate from 'utils/paginate/paginate';

import './Pagination.scss';

const Pagination = ({ activePage, itemsCountPerPage, totalItemsCount, onChange, pageRangeDisplayed }) => {
  const { isLast, pages } = paginate({ totalItemsCount, itemsCountPerPage, activePage, pageRangeDisplayed });

  return (
    <div className="Pagination__container">
      <PaginateLetter letter="g" />
      <PaginateLetter letter="i" />
      <PaginateLetter letter="t" />
      <PaginateLetter letter="h" />
      {pages.map((page) => {
        const active = page === activePage;
        return <PaginateLetter letter="u" active={active} text={page} onClick={() => onChange(page)} key={page} />;
      })}
      <PaginateLetter letter="b" text={!isLast && 'Next'} onClick={!isLast && (() => onChange(activePage + 1))} />
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageRangeDisplayed: PropTypes.number
};

Pagination.defaultProps = {
  pageRangeDisplayed: 5
};

export default memo(Pagination);
