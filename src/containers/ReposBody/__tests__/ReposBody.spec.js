import React from 'react';
import { shallow } from 'enzyme';
import ResultsCounter from 'components/ResultsCounter/ResultsCounter';
import RepoItem from 'components/RepoItem/RepoItem';
import Pagination from 'components/Pagination/Pagination';
import { Component } from './../ReposBody';

const defaultProps = {
  error: '',
  isLoading: false,
  repos: [
    {
      url: 'https://github.com/facebook/react',
      name: 'react',
      stargazers: 144195,
      id: 55
    }
  ],
  total: 1,
  page: 1,
  onPageChange: jest.fn(),
  query: 'react',
  reposPerPage: 5
};

const factory = (props = {}) => {
  return shallow(<Component {...defaultProps} {...props} />);
};

describe('<ReposBody />', () => {
  test('renders without crashing', () => {
    const tree = factory();
  });

  test(`renders nothing until user types in something in search field`, () => {
    const tree = factory({ query: '' });
    expect(tree.text()).toBe('');
  });

  test(`renders error if something went wrong`, () => {
    const error = 'something went wrong';
    const tree = factory({ error });
    expect(tree.text()).toBe(`Error: ${error}`);
  });

  test(`renders loading if data is loading`, () => {
    const tree = factory({ isLoading: true });
    expect(tree.text()).toBe(`Loading...`);
  });

  test(`renders 'No results' if search did find anything`, () => {
    const tree = factory({ repos: [] });
    expect(tree.text()).toBe(`No results`);
  });

  describe('when data loaded successfully', () => {
    test(`renders results counter`, () => {
      const tree = factory();
      expect(tree.find(ResultsCounter).exists()).toBe(true);
    });

    test(`renders results`, () => {
      const tree = factory();
      expect(tree.find(RepoItem).exists()).toBe(true);
    });

    test(`renders pagination`, () => {
      const tree = factory();
      expect(tree.find(Pagination).exists()).toBe(true);
    });
  });
});
