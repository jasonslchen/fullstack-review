const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user: String,
  repo_id: {
    type: Number,
    unique: true
  },
  repoName: String,
  repoFullName: String,
  repoHTMLurl: String,
  forks: Number,

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (userRepo, callback) => {
  let newEntry = new Repo({
    user: userRepo.owner.login,
    repo_id: userRepo.id,
    repoName: userRepo.name,
    repoFullName: userRepo.full_name,
    repoHTMLurl: userRepo.html_url,
    forks: userRepo.forks
  })

  newEntry.save((err) => {
    if (err) {
      callback(err, null);
    }
    callback(null)
  })

}

module.exports.save = save;