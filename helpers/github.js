const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      callback(err, null);
    } else if (res.statusCode === 200) {
      let info = JSON.parse(body);
      callback(null, info);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;