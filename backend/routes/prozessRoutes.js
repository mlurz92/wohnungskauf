// Datei: backend/routes/prozessRoutes.js
const express = require('express');
const router = express.Router();
const prozessController = require('../controllers/prozessController');

router.get('/', prozessController.getAllProzessSchritte);
router.get('/:id', prozessController.getProzessSchrittById);
router.post('/', prozessController.createProzessSchritt);
router.put('/:id', prozessController.updateProzessSchritt);
router.delete('/:id', prozessController.deleteProzessSchritt);

module.exports = router;
