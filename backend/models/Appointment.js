const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
  photos: [{ type: String }],
  reminder: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);