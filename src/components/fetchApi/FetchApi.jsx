import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";

const FetchApi = () => {
  const [issues, setIssues] = useState([]);

  //   add pagination
  const [issuesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIssues] = useState(issues.length);
  // const [issuesData, setIssuesData] = useState(issues);

  //  fetch data from github api
  const fechIssues = async () => {
    const octokit = new Octokit({
      auth: ``,
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

  const ArrayPaginatioNumber = (totalIssues, issuesPerPage) => {
    return Array.from(Array(Math.ceil(totalIssues / issuesPerPage)).keys());
  };

  const PaginateData = (issues, currentPage, issuesPerPage) => {
    return issues.slice(
      currentPage * issuesPerPage,
      currentPage * issuesPerPage + issuesPerPage
    );
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const indexOfLastIssue = currentPage * issuesPerPage;
  // const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  // const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fechIssues();
  }, []);
  return (
    <div>
      <div>
        <ul className="list-group">
          {PaginateData(issues, currentPage, issuesPerPage).map((ele, i) => (
            <li key={i} className="list-group-item list-group-item-action">
              <a href={ele.url}>{ele.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          {ArrayPaginatioNumber(totalIssues, issuesPerPage).map((ele, i) => (
            <li key={i} className="page-item">
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={() => changePage(ele)}
              >
                {ele + 1}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
      {/* <Pagination
        issuesPerPage={issuesPerPage}
        totalIssues={totalIssues.length}
        changePage={changePage}
      /> */}
    </div>
  );
};

export default FetchApi;
