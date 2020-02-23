import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import ListItem from 'components/ListItem';
import { getLastResults, getQuery, setQuery, setPage, getCachedQueries, getPage } from 'reducers/repos/repos';
import './Repos.scss';

class Repos extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  };

  handlePageChange = (page) => {
    this.props.setPage(page);
  };

  render() {
    return (
      <div className="App">
        <form action="" onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.props.query}
              onChange={(event) => {
                this.props.onQueryChange(event.target.value);
              }}
            />
            <button type="submit">Send</button>
          </div>
        </form>
        <ul>
          {this.props.queryList.map((query) => {
            return (
              <li key={query}>
                <button
                  onClick={() => {
                    this.props.onQueryChange(query);
                    this.props.setPage(1);
                  }}
                >
                  {query}
                </button>
              </li>
            );
          })}
        </ul>

        <hr />

        <div>Pagination here</div>
        {this.props.data && (
          // <ReactPaginate
          //   pageCount={Math.ceil(this.props.data.total / this.props.data.items.length)}
          //   pageRangeDisplayed={5}
          //   marginPagesDisplayed={2}
          //   onPageChange={({ selected }) => this.handlePageChange(selected)}
          //   // previousLabel={'previous'}
          //   // nextLabel={'next'}
          //   // breakLabel={'...'}
          //   // breakClassName={'break-me'}
          //   // onPageChange={this.handlePageClick}
          //   // containerClassName={'pagination'}
          //   // subContainerClassName={'pages pagination'}
          //   // activeClassName={'active'}
          // />
          <Pagination
            activePage={this.props.page}
            itemsCountPerPage={30}
            totalItemsCount={this.props.data.total}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        )}
        <hr />

        {this.props.isLoading ? (
          <p>Loading...</p>
        ) : this.props.data && this.props.data.items && this.props.data.items.length ? (
          <>
            TOTAL: {this.props.data.total}
            {this.props.data.items.map((item) => (
              <ListItem key={item.id} url={item.url} name={item.name} stargazers={item.stargazers} />
            ))}
          </>
        ) : (
          <p>No results</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: getLastResults(state),
    isLoading: state.repos.loading,
    query: getQuery(state),
    page: getPage(state),
    queryList: getCachedQueries(state)
  };
};

const mapDispatchToProps = {
  onQueryChange: setQuery,
  setPage: setPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
