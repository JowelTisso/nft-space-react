import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({ debounceSearch }) => {
  return (
    <div className="input-container search-icon-container">
      <IoSearchOutline className="search-icon" />
      <input
        type="text"
        className="input-simple "
        placeholder="Search"
        onChange={debounceSearch}
      />
    </div>
  );
};

export default SearchInput;
