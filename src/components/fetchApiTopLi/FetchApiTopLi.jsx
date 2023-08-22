import React from "react";
import imgIcon from "../../icons/gitiocon.png";

const FetchApiTopLi = ({ issues }) => {
  return (
    <li className="list-group-item list-group-item-action sortingLi">
      <div>
        <button>
          <img src={imgIcon} alt="icon" />
          {issues.length} Open
        </button>
        <button>
          <i className="fa-solid fa-check"></i> Closed
        </button>
      </div>
      <div>
        <span>
          Auther <i className="fa-solid fa-caret-down"></i>
        </span>
        <span>
          Label <i className="fa-solid fa-caret-down"></i>
        </span>
        <span>
          Projects <i className="fa-solid fa-caret-down"></i>
        </span>
        <span>
          Milestone <i className="fa-solid fa-caret-down"></i>
        </span>
        <span>
          Assignee <i className="fa-solid fa-caret-down"></i>
        </span>
        <span>
          Sort <i className="fa-solid fa-caret-down"></i>
        </span>
      </div>
    </li>
  );
};

export default FetchApiTopLi;
