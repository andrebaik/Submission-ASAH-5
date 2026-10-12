import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ keyword, onKeywordChange, placeholder }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder={placeholder}
      value={keyword}
      onChange={(event) => onKeywordChange(event.target.value)}
    />
  </div>
);

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: '',
};

export default SearchBar;
