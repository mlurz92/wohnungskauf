const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const controller = PropertyController(db);
  router.get('/', auth, controller.getProperties);
  router.post('/', auth, controller.addProperty);
  router.put('/', auth, controller.updateProperty);
  return router;
};