const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/fetcher");
mongoose.connect("ds048368.mlab.com:48368/fetcher -u <dbuser> -p <dbpassword>
");

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
  // This function should save a repo or repos to
  // the MongoDB
  let counter = 0;
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
            counter++;
            if (counter === repoArray.length) {
              callback();
            }
          }
        });
      } else {
        console.log("Repo exists in database!");
        counter++;
        if (counter === repoArray.length) {
          callback();
        }
      }
    });
  });
};

let getRepoSort = (criteria, callback) => {
  Repo.countDocuments((err, count) => {
    if (err) {
      callback(err);
    } else {
      Repo.find()
        .sort(`-${criteria}`)
        .limit(25)
        .exec((err, repoList) => {
          if (err) {
            callback(err);
          } else {
            callback(null, repoList, count);
          }
        });
    }
  });
};

let getRepos = callback => {
  Repo.countDocuments((err, count) => {
    if (err) {
      callback(err);
    } else {
      Repo.find()
        .sort("-forks_count")
        .limit(25)
        .exec((err, repoList) => {
          if (err) {
            callback(err);
          } else {
            callback(null, repoList, count);
          }
        });
    }
  });
};

module.exports.save = save;
module.exports.getRepos = getRepos;
module.exports.getRepoSort = getRepoSort;
