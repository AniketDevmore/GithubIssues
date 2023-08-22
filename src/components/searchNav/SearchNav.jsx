import React from "react";
import "./SearchNav.css";

const SearchNav = ({ changeHandle }) => {
  return (
    <div className="searchNav">
      <div className="input-group">
        <div className="input-group-text" id="btnGroupAddon2">
          Filter
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search all issues"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon2"
          onChange={changeHandle}
        />
      </div>
      <div>
        <button className="btn btn-success">New issue</button>
      </div>
    </div>
  );
};

export default SearchNav;
