const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  equity: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  term: { type: Number, required: true }, // in years
  additionalCosts: {
    notary: { type: Number, default: 0 },
    landTax: { type: Number, default: 0 },
    brokerFee: { type: Number, default: 0 },
  },
  budget: {
    plannedExpenses: { type: Number, default: 0 },
    reserves: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Finance', financeSchema);