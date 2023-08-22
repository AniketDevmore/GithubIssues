import React, { useEffect, useState } from "react";
import "./FetchApi.css";
import { Octokit } from "octokit";
import imgIcon from "../../icons/gitiocon.png";
import FetchApiTopLi from "../fetchApiTopLi/FetchApiTopLi";
import SearchNav from "../searchNav/SearchNav";

const FetchApi = () => {
  const [issues, setIssues] = useState([]);

  //   add pagination
  const [issuesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIssues] = useState(issues.length);

  //  fetch data from github api
  const fechIssues = async () => {
    const octokit = new Octokit({
      auth: `${import.meta.env.VITE_REACT_APP_GITTOKEN}`,
    });

    let response = await octokit.request(
      "GET /repos/reactjs/reactjs.org/issues",
      {
        owner: "reactjs",
        repo: "reactjs.org",
      }
    );
    // console.log(response.data);
    let openIssues = response.data.filter((ele) => ele.state == "open");
    setIssues(openIssues);
  };

  useEffect(() => {
    fechIssues();
  }, []);

  // pagination
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  const ArrayPaginationNumber = (totalIssues, issuesPerPage) => {
    return Array.from(Array(Math.ceil(totalIssues / issuesPerPage)).keys());
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchNav />
      <div className="issuesData">
        <ul className="list-group">
          <FetchApiTopLi issues={issues} />
          {currentIssues.map((ele, i) => (
            <li
              key={i}
              className="list-group-item list-group-item-action dynamicLiOuter"
            >
              <div className="dynamicLi">
                <div>
                  <img src={imgIcon} alt="icon" />
                </div>
                <div>
                  <a href={ele.url}>{ele.title}</a>
                  <p>
                    #{ele.number} opened by {ele.user.login}
                  </p>
                </div>
              </div>
              <div>
                <i className="fa-regular fa-message"></i> {ele.comments}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pageNumber">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {ArrayPaginationNumber(issues.length, issuesPerPage).map(
              (ele, i) => (
                <li key={i} className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(ele + 1)}
                  >
                    {ele + 1}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FetchApi;
