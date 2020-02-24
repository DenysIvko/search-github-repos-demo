import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AutosuggestInput from 'components/AutosuggestInput';
import ReposBody from 'containers/ReposBody/ReposBody';
import { getQuery, setQuery, getCachedQueries } from 'reducers/repos/repos';

import './Repos.scss';

const Repos = ({ queryList, query, onQueryChange }) => {
  return (
    <div className="Repos__container mb-3">
      <div className="Repos__header">
        <div className="container">
          <AutosuggestInput suggestions={queryList} value={query} onChange={onQueryChange} />
        </div>
      </div>

      <div className="container">
        <ReposBody />
      </div>
    </div>
  );
};

Repos.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryList: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => {
  return {
    query: getQuery(state),
    queryList: getCachedQueries(state)
  };
};

const mapDispatchToProps = {
  onQueryChange: setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
