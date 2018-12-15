const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to fetcher database.");
});

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  owner: {
    login: String,
    avatar_url: String,
    html_url: String
  },
  html_url: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  open_issues: Number
});

let Repo = mongoose.model("Repo", repoSchema);

let save = (repoArray, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repoArray.forEach(repo => {
    Repo.find({ id: repo.id }, (err, repoList) => {
      if (err) {
        throw err;
      } else if (repoList.length === 0) {
        Repo.create(repo, err => {
          if (err) {
            throw err;
          } else {
            console.log("Success!");
          }
        });
      } else {
        console.log("Repo exists in database!");
      }
    });
  });
  callback();
};

let getRepos = callback => {
  Repo.find()
    .sort("-forks_count")
    .limit(25)
    .exec((err, repoList) => {
      if (err) {
        callback(err);
      } else {
        callback(null, repoList);
      }
    });
};

module.exports.save = save;
module.exports.getRepos = getRepos;
