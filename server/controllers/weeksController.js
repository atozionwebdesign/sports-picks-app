const db = require("../models");

// Defining methods for the weeksController
module.exports = {
  findAll: function(req, res) {
    db.Week
      .find({}, {'__v':0})
      .then(weeks => {(
        res.json(weeks))
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Week
      .findById(req.params.id)
      .then(week => res.json(week))
      .catch(err => res.status(422).json(err));
  }
};
