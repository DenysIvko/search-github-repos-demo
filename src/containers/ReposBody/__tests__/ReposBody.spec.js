import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import ReposBody from '../ReposBody';

describe('ReposBody', () => {
  test('renders connect', () => {
    const createMockStore = configureMockStore([
      /* add middlewares here */
    ]);
    const mockStore = createMockStore({} /* add initial state here */);

    const tree = shallow(<ReposBody store={mockStore} />);

    expect(tree.find('connect').exists()).toEqual(true);
  });
});
