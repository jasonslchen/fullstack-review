const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const githubAPIcall = require('../helpers/github.js');
const mongooseSave = require('../database/index.js');

app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  githubAPIcall.getReposByUsername(req.body.user, (err, repos) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
        repos.forEach((repo) => {
          mongooseSave.save(repo, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.status(200).send();
            }
          });
        })
      }
    })
  // console.log(req.body);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//allrepos come in as an array of objects
//rank repos by size
