const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to fetcher database.");
});

let repoSchema = new mongoose.Schema({
{
    id: Number,
    name: String,
    full_name: String,
    owner: {
      avatar_url: String,
      gravatar_id: String,
      html_url: String,
      repos_url: String,
    },
    private: Boolean,
    html_url: String,
    description: String,
    fork: Boolean,
    created_at: Date,
    updated_at: Date,
    pushed_at: String,
    size: Number,
    stargazers_count: Number,
    watchers_count: Number,
    has_issues: Boolean,
    has_downloads: Boolean,
    has_wiki: Boolean,
    has_pages: Boolean,
    forks_count: Number,
    open_issues_count: Number,
    forks: Number,
    open_issues: Number,
    watchers: Number,
  }
});

let Repo = mongoose.model("Repo", repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

module.exports.save = save;
