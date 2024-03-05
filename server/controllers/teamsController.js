const db = require("../models");

// Defining methods for the teamsController
module.exports = {
  findAll: function(req, res) {
    db.Team
      .find({}, {'__v':0})
      .then(teams =>
        res.json(teams))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Team
      .find({ _id: req.params.id })
      .then(teams => res.json(teams))
      .catch(err => res.status(422).json(err));
  },
  findByLeague: function(req, res) {
    db.Team
      .find({league: req.params.league.toUpperCase()})
      .then(teams => res.json(teams))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Team
      .create(req.body)
      .then(team => res.json(team))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Team
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(team => res.json(team))
      .catch(err => res.status(422).json(err));
  },
  deleteById: function(req, res) {
    db.Team
      .findByIdAndDelete(req.params.id)
      .then(team => res.json(team))
      .catch(err => res.status(422).json(err));
  }
};
