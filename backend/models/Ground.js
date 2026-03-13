const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema(
  {
    groundName: {
      type: String,
      required: true,
    },
    sportType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    availableSlots: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ground", groundSchema);