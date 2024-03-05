const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DivisionSchema = new Schema(
    {
      conference: String,
      division: String,
      league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sport"
      }
    }
  );

const Division = mongoose.model("Division", DivisionSchema, "divisions");

module.exports = Division;
