const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  version: { type: Number, default: 1 },
  notes: { type: String },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);