import React from 'react';

import './Repos.scss';
import { fetchRepos } from 'api/repos/repos';
import ListItem from 'components/ListItem';

class Repos extends React.Component {
  state = {
    query: '',
    data: {}
  };

  componentDidMount() {
    console.log('mounted');
  }

  fetchData = (event) => {
    event.preventDefault();

    fetchRepos({
      query: this.state.query,
      page: 3
    }).then((data) => {
      this.setState({
        data
      });
    });
  };

  handlePageChange = (page) => {
    this.props.onSubmit({
      query: this.props.query,
      page
    });
  };

  render() {
    return (
      <div className="App">
        <form action="" onSubmit={this.fetchData}>
          <input
            type="text"
            value={this.state.query}
            onChange={(event) => {
              this.setState({
                query: event.target.value
              });
            }}
          />
          <button type="submit">Send</button>
        </form>

        <hr />

        {this.state.data &&
          this.state.data.items &&
          this.state.data.items.map((item) => (
            <ListItem key={item.id} url={item.url} name={item.name} stargazers={item.stargazers} />
          ))}
      </div>
    );
  }
}

export default Repos;
