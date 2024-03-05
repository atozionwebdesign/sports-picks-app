const db = require("../models");

// Defining methods for the groupsController
module.exports = {
  findAll: function (req, res) {
    db.Group
    .find({}, { __v: 0 })
      .then((groups) => {
        res.json(groups);
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Group
    .findById(req.params.id)
      .then((group) => res.json(group))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Group
    .create(req.body)
      .then((group) => res.json(group))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Group
    .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((group) => res.json(group))
      .catch((err) => res.status(422).json(err));
  },
  deleteById: function (req, res) {
    db.Group
    .findByIdAndDelete(req.params.id)
      .then((group) => res.json(group))
      .catch((err) => res.status(422).json(err));
  },
};
