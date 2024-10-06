const { Schema, model } = require("mongoose");

const facilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
});

const Facility = model("Facility", facilitySchema);

module.exports = Facility;
