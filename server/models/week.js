const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeekSchema = new Schema(
    {
        weekNumber: Number,
        date: Date
    }
);

const Week = mongoose.model("Week", WeekSchema, "weeks");

module.exports = Week;