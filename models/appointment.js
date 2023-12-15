const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  times: { type: [String], required: true },
  isTimeSlotAvailable: { type: Boolean, default: true },
});

// Remove the unique index on times
// appointmentSchema.index({ date: 1, times: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
