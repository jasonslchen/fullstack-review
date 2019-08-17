const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const githubAPIcall = require('../helpers/github.js');
const mongooseDB = require('../database/index.js');
const Promise = require('bluebird')
const path = require('path');

app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client/dist'));

app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


app.post('/repos', function (req, res) {

  githubAPIcall.getReposByUsername(req.body.user, (err, repos) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      let arr = [];
      for(let i = 0; i < repos.length; i++) {
        arr.push(mongooseDB.save(repos[i]));
      }
      Promise.all(arr)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        console.log('ugh', err);
      })
    }

  })


});

app.get('/repos', function (req, res) {
  console.log('get reached outer');
  mongooseDB.sort().then((data) => {
    console.log('get reached inner');
    res.send(data).end();
  }).catch((err) => {
    res.sendStatus(500).end();
  })


});

let port = process.env.PORT;
console.log(process.env.PORT);
if (!port) {
  port = 1128;
}


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//allrepos come in as an array of objects
//rank repos by size
