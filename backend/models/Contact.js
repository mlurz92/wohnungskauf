const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  tasks: [{ type: String }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
});

module.exports = mongoose.model('Contact', contactSchema);