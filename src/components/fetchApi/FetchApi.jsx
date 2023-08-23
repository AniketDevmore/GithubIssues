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
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredIssue, setFilteredIssue] = useState(issues);

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
    setFilteredIssue(openIssues);
  };

  useEffect(() => {
    fechIssues();
  }, []);

  // pagination
  const ArrayPaginationNumber = (totalIssues, issuesPerPage) => {
    return Array.from(Array(Math.ceil(totalIssues / issuesPerPage)).keys());
  };

  const currentIssues = (filteredIssue, currentPage, issuesPerPage) => {
    return filteredIssue.slice(
      currentPage * issuesPerPage,
      currentPage * issuesPerPage + issuesPerPage
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const changeHandle = (event) => {
    let value = event.target.value;

    if (value.length > 0) {
      const regex = new RegExp(value, "gi");
      const filteredData = issues.filter((ele) => {
        return regex.test(ele.title);
      });
      // console.log(filteredData);
      setFilteredIssue([...filteredData]);
    } else {
      setFilteredIssue([...issues]);
    }
  };

  return (
    <div>
      <SearchNav changeHandle={changeHandle} />
      <div className="issuesData">
        <ul className="list-group">
          <FetchApiTopLi issues={issues} filteredIssue={filteredIssue} />
          {currentIssues(filteredIssue, currentPage, issuesPerPage).map(
            (ele, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action dynamicLiOuter"
              >
                <div className="dynamicLi">
                  <div>
                    <img src={imgIcon} alt="icon" />
                  </div>
                  <div>
                    <a href={ele.html_url}>{ele.title}</a>
                    <p>
                      #{ele.number} opened by {ele.user.login}
                    </p>
                  </div>
                </div>
                <div>
                  <i className="fa-regular fa-message"></i> {ele.comments}
                </div>
              </li>
            )
          )}
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
                    onClick={() => paginate(ele)}
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
