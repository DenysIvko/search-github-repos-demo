import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import ListItem from 'components/ListItem';
import AutosuggestInput from 'components/AutosuggestInput';
import ResultsCounter from 'components/ResultsCounter/ResultsCounter';
import { getLastResults, getQuery, setQuery, setPage, getCachedQueries, getPage } from 'reducers/repos/repos';
import './Repos.scss';

class Repos extends React.Component {
  handlePageChange = (page) => {
    this.props.setPage(page);
  };

  render() {
    if (this.props.error) {
      return <p>Error: {this.props.error}</p>;
    }

    return (
      <div className="Repos__container">
        <div className="Repos__header">
          <div className="container">
            <AutosuggestInput
              suggestions={[...this.props.queryList, 'hello', 'world', 'etc']}
              value={this.props.query}
              onChange={this.props.onQueryChange}
            />
          </div>
        </div>

        <div className="container">
          {this.props.data && (
            <div className="mb-2">
              <ResultsCounter counter={this.props.data.total} />
            </div>
          )}

          {this.props.isLoading ? (
            <p>Loading...</p>
          ) : this.props.data && this.props.data.items && this.props.data.items.length ? (
            this.props.data.items.map((item) => (
              <ListItem key={item.id} url={item.url} name={item.name} stargazers={item.stargazers} />
            ))
          ) : (
            <p>No results</p>
          )}

          <div>Pagination here</div>
          {this.props.data && (
            <Pagination
              activePage={this.props.page}
              itemsCountPerPage={30}
              totalItemsCount={this.props.data.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          )}
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: getLastResults(state),
    isLoading: state.repos.loading,
    query: getQuery(state),
    error: state.repos.error,
    page: getPage(state),
    queryList: getCachedQueries(state)
  };
};

const mapDispatchToProps = {
  onQueryChange: setQuery,
  setPage: setPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
