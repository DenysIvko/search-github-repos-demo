import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../Pagination';

const factory = () => {
  return shallow(
    <Pagination
      activePage={1}
      itemsCountPerPage={3}
      totalItemsCount={100}
      pageRangeDisplayed={5}
      onChange={jest.fn()}
    />
  );
};

describe('<Pagination />', () => {
  test('renders', () => {
    const tree = factory();
    expect(tree.find('PaginateLetter').exists()).toBe(true);
  });
});
