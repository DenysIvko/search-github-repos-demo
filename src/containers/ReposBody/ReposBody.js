import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Pagination from 'components/Pagination';
import RepoItem from 'components/RepoItem';
import ResultsCounter from 'components/ResultsCounter/ResultsCounter';
import { getLastResults, getPage, getQuery, setPage } from 'reducers/repos/repos';

const ReposBody = ({ error, isLoading, repos, total, page, onPageChange, query, reposPerPage }) => {
  if (!query) {
    return null;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!repos.length) {
    return <p>No results</p>;
  }

  return (
    <div className="container-xs">
      <div className="mb-2">
        <ResultsCounter counter={total} />
      </div>

      <div className="mb-3">
        {repos.map((item) => (
          <RepoItem key={item.id} url={item.url} name={item.name} starsCount={item.stargazers} />
        ))}
      </div>

      <Pagination
        activePage={page}
        itemsCountPerPage={reposPerPage}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        onChange={onPageChange}
      />
    </div>
  );
};

ReposBody.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
      stargazers: PropTypes.number,
      id: PropTypes.number
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  reposPerPage: PropTypes.number.isRequired
};

ReposBody.defaultProps = {
  error: ''
};

const mapStateToProps = (state) => {
  const { items, total, params } = getLastResults(state);
  return {
    repos: items,
    reposPerPage: params.perPage,
    total,
    isLoading: state.repos.loading,
    query: getQuery(state),
    error: state.repos.error,
    page: getPage(state)
  };
};

const mapDispatchToProps = {
  onPageChange: setPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ReposBody);
