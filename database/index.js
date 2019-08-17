const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user: {type: String, required: true},
  repo_id: {
    type: Number,
    unique: true,
    required: true
  },
  repoName: {type: String, required: true},
  repoFullName: {type: String, required: true},
  repoHTMLurl: {type: String, required: true},
  forks: {type: Number, required: true},

});

let Repo = mongoose.model('UserRepos', repoSchema);

let save = (userRepo, callback) => {
  let newEntry = new Repo({
    user: userRepo.owner.login,
    repo_id: userRepo.id,
    repoName: userRepo.name,
    repoFullName: userRepo.full_name,
    repoHTMLurl: userRepo.html_url,
    forks: userRepo.forks
  })

  return Repo.create(newEntry);

}

let sort = () => {
  return Repo.find({}).sort({forks: 'desc'}).exec();

}

module.exports.save = save;

module.exports.sort = sort;