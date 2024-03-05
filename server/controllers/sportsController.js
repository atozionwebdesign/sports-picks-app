const db = require("../models");

// Defining methods for the sportsController
module.exports = {
  findAll: function(req, res) {
    db.Sport
      .find({}, req.params, {'__v':0})
      .then(sports => {
        res.status(200).json(sports)
      })
      .catch(err => res.status(404).json(err));
  },
  findById: function(req, res) {
    db.Sport
      .findById(req.params.id)
      .then(sport => res.json(sport))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Sport
      .create(req.body)
      .then(sport => res.json(sport))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Sport
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(sport => res.json(sport))
      .catch(err => res.status(422).json(err));
  },
  deleteById: function(req, res) {
    db.Sport
      .findByIdAndDelete(req.params.id)
      .then(sport => res.json(sport))
      .catch(err => res.status(422).json(err));
  }
};
