const express = require('express');
const router = express.Router();
const ProgressController = require('../controllers/ProgressController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const controller = ProgressController(db);
  router.get('/', auth, controller.getProgress);
  router.put('/', auth, controller.updateProgress);
  return router;
};