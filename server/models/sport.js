const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SportSchema = new Schema(
    {
      sport: String,
      league: String,
    }
  );

const Sport = mongoose.model("Sport", SportSchema, "sports");

module.exports = Sport;
