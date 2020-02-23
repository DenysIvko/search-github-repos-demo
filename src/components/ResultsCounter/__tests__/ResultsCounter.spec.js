import React from 'react';
import { shallow } from 'enzyme';

import ResultsCounter from '../ResultsCounter';

const factory = (props) => shallow(<ResultsCounter {...props} />);

const getExpectedOutput = (counter) => `About ${counter} results`;

describe('<ResultsCounter />', () => {
  test('renders formatted number', () => {
    const tree = factory({ counter: 10000 });

    expect(tree.text()).toBe(getExpectedOutput('10,000'));
  });
});
