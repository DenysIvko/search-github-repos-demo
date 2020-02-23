import React from 'react';
import { mount } from 'enzyme';
import OutsideClickHandler from 'react-outside-click-handler';
import AutosuggestInput from '../AutosuggestInput';

jest.mock('react-outside-click-handler', () => {
  const OutsideClickHandler = ({ children }) => <div>{children}</div>;
  return {
    __esModule: true,
    default: OutsideClickHandler
  };
});

const defaultProps = {
  onChange: jest.fn(),
  value: 'react'
};

const createFakeChangeEvent = (value) => ({ target: { name: 'search', value } });
const suggestions = ['angular', 'react', 'vue'];

const factory = (props) => {
  return mount(<AutosuggestInput {...defaultProps} {...props} />);
};

describe('<AutosuggestInput />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    const wrapper = factory();
    expect(wrapper.find('AutosuggestInput').exists()).toBe(true);
  });

  test('renders correct value in input', () => {
    const value = 'search value';
    const wrapper = factory({ value });
    expect(wrapper.find('input').props().value).toBe(value);
  });

  test(`initially doesn't render suggestions`, () => {
    const wrapper = factory({ suggestions });
    const suggestionList = wrapper.find('.AutosuggestInput__suggestions-list');
    expect(suggestionList.exists()).toBe(false);
  });

  describe('suggestions window', () => {
    test('renders suggestions if user starts typing in input', () => {
      const newValue = 'search value';
      const wrapper = factory({ suggestions });
      // simulate onChange on input
      wrapper.find('input').simulate('change', createFakeChangeEvent(newValue));

      const suggestionsElements = wrapper.find('.AutosuggestInput__suggestion');
      expect(suggestionsElements.length).toBe(suggestions.length);
    });

    test(`hides suggestions if user clicks outside of component`, () => {
      const newValue = 'search value';
      const getSuggestionListEl = () => wrapper.find('.AutosuggestInput__suggestions-list');
      const wrapper = factory({ suggestions });

      // simulate onChange on input
      wrapper.find('input').simulate('change', createFakeChangeEvent(newValue));
      expect(getSuggestionListEl().exists()).toBe(true);
      // simulate outside of component click
      wrapper.find('OutsideClickHandler').invoke('onOutsideClick')();
      expect(getSuggestionListEl().exists()).toBe(false);
    });

    test(`do not opens suggestions if there're no suggestions`, () => {
      const suggestions = [];
      const newValue = 'search value';
      const wrapper = factory({ suggestions });

      // simulate onChange on input
      wrapper.find('input').simulate('change', createFakeChangeEvent(newValue));
      expect(wrapper.find('.AutosuggestInput__suggestions-list').exists()).toBe(false);
    });
  });

  describe('invokes onChange', () => {
    test('if user types in input', () => {
      const newValue = 'search value';
      const wrapper = factory();
      // simulate onChange on input
      wrapper.find('input').simulate('change', createFakeChangeEvent(newValue));
      expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
    });

    test('if user clicks on one of suggestions', () => {
      const newValue = 'search value';
      const wrapper = factory({ suggestions });
      // simulate onChange on input
      wrapper.find('input').simulate('change', createFakeChangeEvent(newValue));

      const firstSuggestionButton = wrapper.find('.AutosuggestInput__suggestion button').first();
      firstSuggestionButton.simulate('click');
      expect(firstSuggestionButton.exists()).toBe(true);
      expect(defaultProps.onChange).toHaveBeenCalledWith(suggestions[0]);
    });
  });
});
