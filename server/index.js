const express = require("express");
const githubHelper = require("../helpers/github.js");
const repoDatabase = require("../database");
const bodyParser = require("body-parser");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser());

app.post("/repos", function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  githubHelper.getReposByUsername(req.body.username, response => {
    repoDatabase.save(response, () => {
      res.send(req.body.username);
    });
  });
});

app.get("/repos", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  repoDatabase.getRepos((err, response) => {
    if (err) {
      throw err;
    } else {
      res.send(response);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
