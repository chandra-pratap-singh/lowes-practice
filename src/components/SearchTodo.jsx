import React, { useCallback } from "react";

const SearchTodo = ({ filtertext, setFilterText }) => {
  const updateSearchFilter = useCallback(
    (event) => {
      const text = event.target.value;
      setFilterText(text);
    },
    [setFilterText]
  );
  return (
    <>
      Search: <input value={filtertext} onChange={updateSearchFilter} /> <br />
      <br />
    </>
  );
};

export default SearchTodo;
