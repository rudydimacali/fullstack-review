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
      repos: []
    };
    this.RepoTableDisplay = this.RepoTableDisplay.bind(this);
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
            this.setState({ repos: getResponse });
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
          <td>{repo.watchers_count}</td>
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
            <th>Stars</th>
            <th>Watchers</th>
            <th>Forks</th>
          </tr>
          {reposDisplay}
        </table>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
        <this.RepoTableDisplay />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
