const express = require('express');
const router = express.Router();
const FinanceController = require('../controllers/FinanceController');
const auth = require('../utils/auth'); // Korrigierter Pfad

module.exports = (db) => {
  const financeController = FinanceController(db);
  router.get('/', auth, financeController.getFinance);
  router.put('/', auth, financeController.updateFinance);
  return router;
};
