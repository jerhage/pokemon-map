const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
};

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    visitDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
