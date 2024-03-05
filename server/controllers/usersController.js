const db = require("../models");

// Defining methods for the usersController

module.exports = {
  create: async function (req, res) {
    const newUser = new db.User({
      name: req.body.name,
      password: req.body.password,
      profilePic: req.body.profilePic,
      email: req.body.email,
      phone: req.body.phone,
    });

    try {
      await newUser
        .save()
        .then(
          (user) => (console.log("New user created: ", user), res.json(user))
        );
    } catch (err) {
      res.json(err);
    }
  },
  authenticate: async function (req, res) {
    try {
      await db.User.findOne({ name: req.body.name }).then((user) =>
        user
          ? user.comparePassword(
              req.body.password,
              user.password,
              function (err, isMatch) {
                if (err) throw err;

                if (isMatch === true) {
                  res.json(user);
                } else {
                  res.status(404).send("Invalid login info");
                }
              }
            )
          : res.status(404).send("Invalid login info")
      );
    } catch (err) {
      res.json(err);
    }
  },
  // only send params that need to be updated
  update: async function (req, res) {
    await db.User.findById(req.params.id)
      .then((user) => {
        Object.keys(req.body).map((key) => {
          user[key] = req.body[key];
        });
        user.save().then((update) => res.json(update));
      })
      .catch((err) => res.status().json(err));
  },
  findAll: function (req, res) {
    db.User.find({}, { __v: 0 })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        res.json({
          name: user.name,
          profilePic: user.profilePic,
          id: user._id,
        });
      })
      .catch((err) => res.status(422).json(err));
  },

  findByIds: function (req, res) {
    
  },

  deleteById: function (req, res) {
    db.User.findByIdAndDelete(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
};
