const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // Dateiname vereinheitlicht

module.exports = (db) => {
  const controller = UserController(db);
  router.post('/register', controller.register);
  router.post('/login', controller.login);
  return router;
};
