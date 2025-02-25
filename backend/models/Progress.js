const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' },
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  steps: [{
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    tasks: [taskSchema],
  }],
});

module.exports = mongoose.model('Progress', progressSchema);