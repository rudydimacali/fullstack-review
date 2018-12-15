import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.RepoTableDisplay = this.RepoTableDisplay.bind(this);
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
            {repo.owner.login}
            <img src={repo.owner.avatar_url} />
          </td>
          <td>{repo.owner.html_url}</td>
          <td>{repo.name}</td>
          <td>{repo.html_url}</td>
          <td>{repo.created_at}</td>
          <td>{repo.updated_at}</td>
          <td>{repo.stargazers_count}</td>
          <td>{repo.watchers_count}</td>
          <td>{repo.forks_count}</td>
        </tr>
      );
    });
    return (
      <table>
        <tr>
          <th>Username</th>
          <th>User URL</th>
          <th>Repo Name</th>
          <th>Repo Link</th>
          <th>Created At</th>
          <th>Last Updated</th>
          <th>Stars</th>
          <th>Watchers</th>
          <th>Forks</th>
        </tr>
        {reposDisplay}
      </table>
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
