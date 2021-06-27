const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  eName: {
    type: String,
  },
  eDescription: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  organizer: {
    type: String,
  },
  ticket: {
    type: Array,
  },
});

module.exports = mongoose.model("Event", eventSchema);
