const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Pick.find({}, { __v: 0 })
      .then(
        (picks) => res.json(picks)
      )
      .catch((err) => res.status(422).json(err));
  },
  create: async function (req, res) {
    let data = req.body;
    let picks = [];
    data.map((pick) =>
      picks.push({
        season: pick.season,
        week: pick.week,
        league: pick.league,
        gameId: pick.gameId,
        team: pick.team,
        date: pick.date,
        userId: pick.userId,
        winner: pick.winner,
        evaluated: false
      })
    );
    await db.Pick.insertMany(picks)
      .then((picks) => res.json(picks))
      .catch((err) => res.status(422).json(err));
  },
  update: async function (req, res){
    console.log(req.body)
    await db.Pick
      .findOneAndUpdate({gameId: req.params.id}, req.body, {new: true})
      .then(picks => res.json(picks))
      .catch(err => res.status(422).json(err))
  }
};
