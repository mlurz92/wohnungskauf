const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const controller = ContactController(db);
  router.get('/', auth, controller.getContacts);
  router.post('/', auth, controller.addContact);
  router.put('/', auth, controller.updateContact);
  return router;
};