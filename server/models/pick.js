const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickSchema = new Schema(
  {
    season: String,
    week: String,
    league: String,
    gameId: String,
    team: String,
    userId: String,
    winner: Boolean,
    date: Date,
    evaluated: Boolean
  },
  { timestamps: true }
);

const Pick = mongoose.model("Pick", PickSchema, "picks");

module.exports = Pick;
