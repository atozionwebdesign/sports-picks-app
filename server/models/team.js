const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  abbreviation: String,
  name: String,
  division: String
});

const Team = mongoose.model("Team", TeamSchema, "teams");

module.exports = Team;
