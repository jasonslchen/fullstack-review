const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user: String,
  repoName: String,
  repFullName: {
    type: String,
    unique: true
  },
  repoHTMLurl: String,
  forks: Number,

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (userRepo, callback) => {
  let newEntry = new Repo({
    user: userRepo.owner.login,
    repoName: userRepo.name,
    repFullName: userRepo.full_name,
    repoHTMLurl: userRepo.html_url,
    fork: userRepo.forks_count
  })

  newEntry.save((err) => {
    if (err) {
      callback(err, null);
    }
    callback(null)
  })

}

module.exports.save = save;