const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  times: { type: [String], required: true },
  isTimeSlotAvailable: { type: Boolean, default: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
