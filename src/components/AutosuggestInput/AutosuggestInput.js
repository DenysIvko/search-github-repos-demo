import React, { useState, memo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './AutosuggestInput.scss';

const AutosuggestInput = ({ value, placeholder, onChange, suggestions }) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldOpenSuggestions = isFocused && Boolean(suggestions.length);
  return (
    <div className="container-xs AutosuggestInput__container">
      <OutsideClickHandler onOutsideClick={() => setIsFocused(false)}>
        <input
          className={cx('AutosuggestInput__input', { 'AutosuggestInput__input--focus': shouldOpenSuggestions })}
          name="search"
          type="text"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            setIsFocused(true);
            onChange(event.target.value);
          }}
        />
        {shouldOpenSuggestions && (
          <ul className="AutosuggestInput__suggestions-list">
            {suggestions.map((suggestion) => (
              <li className="AutosuggestInput__suggestion" key={suggestion}>
                <button
                  onClick={() => {
                    setIsFocused(false);
                    onChange(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </OutsideClickHandler>
    </div>
  );
};

AutosuggestInput.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

AutosuggestInput.defaultProps = {
  suggestions: [],
  placeholder: 'Try typing something in here...'
};

export default memo(AutosuggestInput);
