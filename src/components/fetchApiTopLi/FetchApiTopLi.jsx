import React from "react";
import imgIcon from "../../icons/gitiocon.png";

const FetchApiTopLi = ({ filteredIssue }) => {
  return (
    <li className="list-group-item list-group-item-action sortingLi">
      <div>
        <button>
          <img src={imgIcon} alt="icon" />
          {filteredIssue.length} Open
        </button>
      </div>
    </li>
  );
};

export default FetchApiTopLi;
