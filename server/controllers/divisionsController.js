const db = require("../models");

// Defining methods for the divisionsController
module.exports = {
  findAll: function(req, res) {
    db.Division
      .find({}, {'__v':0})
      .populate({path: 'league', select: 'league -_id'})
      .then(divisions => {(
        res.json(divisions))
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Division
      .findById(req.params.id)
      .then(division => res.json(division))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Division
      .create(req.body)
      .then(division => res.json(division))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Division
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(division => res.json(division))
      .catch(err => res.status(422).json(err));
  },
  deleteById: function(req, res) {
    db.Division
      .findByIdAndDelete(req.params.id)
      .then(division => res.json(division))
      .catch(err => res.status(422).json(err));
  }
};
