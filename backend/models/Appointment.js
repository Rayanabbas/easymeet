const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm
    status: { type: String, default: "confirmed" }, // confirmed | canceled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
