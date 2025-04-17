const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    questionCount: {
      type: Number,
      required: true,
      default: 10,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Config", configSchema);
