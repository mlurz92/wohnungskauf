const express = require('express');
const router = express.Router();
const FinanceController = require('../controllers/FinanceController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const financeController = FinanceController(db);
  router.get('/', auth, financeController.generateReport);
  return router;
};
