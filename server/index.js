const express = require("express");
const githubHelper = require("../helpers/github.js");
const repoDatabase = require("../database");
const bodyParser = require("body-parser");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser());

app.post("/repos", function(req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  githubHelper.getReposByUsername(req.body.username, response => {
    if (!response.message) {
      repoDatabase.save(response, () => {
        res.send(req.body.username);
      });
    }
  });
});

app.get("/repos", function(req, res) {
  // This route should send back the top 25 repos
  repoDatabase.getRepos((err, repos, count) => {
    if (err) {
      res.send(err);
    } else {
      res.send([repos, count]);
    }
  });
});

app.get("/repoSort", function(req, res) {
  repoDatabase.getRepoSort(req.url.split("=")[1], (err, repos, count) => {
    if (err) {
      res.send(err);
    } else {
      res.send([repos, count]);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
