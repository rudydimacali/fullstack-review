import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";
let format = require("date-fns/format");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      count: 0
    };
    this.RepoTableDisplay = this.RepoTableDisplay.bind(this);
    this.searchSort = this.searchSort.bind(this);
  }
  componentDidMount() {
    this.search("rudydimacali");
  }
  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "/repos",
      data: { username: term },
      success: response => {
        $.ajax({
          type: "GET",
          url: "/repos",
          success: getResponse => {
            // console.log(getResponse);
            this.setState({ repos: getResponse[0], count: getResponse[1] });
          },
          error: error => {
            console.log("Error!");
          }
        });
      },
      error: error => {
        console.log("Error!");
      }
    });
  }
  searchSort(e) {
    e.preventDefault();
    let criteria;
    if (e.target.innerHTML === "Stars") {
      criteria = "stargazers_count";
    } else if (e.target.innerHTML === "Watchers") {
      criteria = "watchers_count";
    } else if (e.target.innerHTML === "Forks") {
      criteria = "forks_count";
    }
    $.ajax({
      type: "GET",
      url: "/repoSort",
      data: { criteria: criteria },
      success: getResponse => {
        this.setState({ repos: getResponse[0], count: getResponse[1] });
      },
      error: error => {
        console.log("Error!");
      }
    });
  }
  RepoTableDisplay() {
    let repos = this.state.repos;
    let reposDisplay = repos.map(repo => {
      return (
        <tr>
          <td>
            <img src={repo.owner.avatar_url} />
            <a href={repo.owner.html_url}>{repo.owner.login}</a>
          </td>
          <td>
            <a href={repo.html_url}>{repo.name}</a>
          </td>
          <td>
            {format(Date.parse(repo.created_at), "hh:mm A")}
            <br />
            {format(Date.parse(repo.created_at), "MMM Do, YYYY")}
          </td>
          <td>
            {format(Date.parse(repo.updated_at), "hh:mm A")}
            <br />
            {format(Date.parse(repo.updated_at), "MMM Do, YYYY")}
          </td>
          <td>{repo.stargazers_count}</td>
          <td>{repo.forks_count}</td>
        </tr>
      );
    });
    return (
      <div id="reposDisplay">
        <table>
          <tr>
            <th>Username</th>
            <th>Repo Name</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th onClick={this.searchSort}>Stars</th>
            <th onClick={this.searchSort}>Forks</th>
          </tr>
          {reposDisplay}
        </table>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>
          <img id="github" src="./img/github.png" />
          <br />
          Fetcher
        </h1>
        <RepoList repos={this.state.repos} count={this.state.count} />
        <Search onSearch={this.search.bind(this)} />
        <this.RepoTableDisplay />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
