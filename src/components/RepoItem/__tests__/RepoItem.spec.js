import React from 'react';
import { shallow } from 'enzyme';

import RepoItem from '../RepoItem';

const defaultProps = {
  url: 'https://github.com/facebook/react',
  name: 'react',
  starsCount: 144195
};

const factory = (props) => shallow(<RepoItem {...defaultProps} {...props} />);

describe('<RepoItem />', () => {
  describe('renders', () => {
    const tree = factory(defaultProps);

    test('with proper url', () => {
      expect(tree.find('a').props().href).toBe(defaultProps.url);
    });

    test('with proper name', () => {
      expect(tree.find('a').text()).toBe(defaultProps.name);
    });

    test('with formatted stars count', () => {
      expect(tree.find('.RepoItem__counter-container span').text()).toBe('144,195');
    });
  });
});
