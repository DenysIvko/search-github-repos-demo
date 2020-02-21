import React from 'react';
import { shallow } from 'enzyme';
import Repos from './../Repos';

describe('<Repos />', () => {
  test('renders without crashing', () => {
    shallow(<Repos />);
  });
});
