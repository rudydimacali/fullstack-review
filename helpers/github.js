const request = require("request");

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      "User-Agent": "request",
      Authorization: `token ${process.env.TOKEN}`
    }
  };
  request.get(options, (error, response, body) => {
    if (error) {
      throw error;
    } else {
      callback(JSON.parse(body));
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;
