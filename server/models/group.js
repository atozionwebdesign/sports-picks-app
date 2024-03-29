const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        name: String,
        logo: String
    }
);

const Group = mongoose.model("Group", GroupSchema, "groups");

module.exports = Group;
