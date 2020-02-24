import React from 'react';
import { shallow } from 'enzyme';
import { Component } from './../Repos';
import ReposBody from 'containers/ReposBody/ReposBody';
import AutosuggestInput from 'components/AutosuggestInput/AutosuggestInput';

const defaultProps = {
  onQueryChange: jest.fn(),
  query: 'react',
  queryList: ['react', 'vue', 'angular']
};

const factory = (props = {}) => {
  return shallow(<Component {...defaultProps} {...props} />);
};

describe('<Repos />', () => {
  test('renders without crashing', () => {
    const tree = factory();
  });

  test('renders `ReposBody` component', () => {
    const tree = factory();
    expect(tree.find(ReposBody).exists()).toBe(true);
  });

  test('passes correct props in `AutosuggestInput` component', () => {
    const tree = factory();
    const autosuggestInputEl = tree.find(AutosuggestInput);
    expect(autosuggestInputEl.exists()).toBe(true);
    expect(autosuggestInputEl.props().suggestions).toBe(defaultProps.queryList);
    expect(autosuggestInputEl.props().value).toBe(defaultProps.query);
    expect(autosuggestInputEl.props().onChange).toBe(defaultProps.onQueryChange);
  });
});
