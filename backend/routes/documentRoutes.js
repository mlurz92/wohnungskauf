const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/DocumentController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const controller = DocumentController(db);
  router.post('/', auth, controller.uploadDocument, controller.saveDocument);
  router.get('/', auth, controller.getDocuments);
  router.put('/', auth, controller.updateDocument);
  return router;
};