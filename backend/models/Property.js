const mongoose = require('mongoose');

const criterionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, min: 0, max: 10, required: true },
});

const propertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  area: { type: Number },
  rooms: { type: Number },
  price: { type: Number, required: true },
  criteria: [criterionSchema],
  pros: [{ type: String }],
  cons: [{ type: String }],
});

module.exports = mongoose.model('Property', propertySchema);