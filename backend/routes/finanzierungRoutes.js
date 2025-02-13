// Datei: backend/routes/finanzierungRoutes.js
const express = require('express');
const router = express.Router();
const finanzierungController = require('../controllers/finanzierungController');

router.get('/', finanzierungController.getAllFinanzierung);
router.get('/:id', finanzierungController.getFinanzierungById);
router.post('/', finanzierungController.createFinanzierung);
router.put('/:id', finanzierungController.updateFinanzierung);
router.delete('/:id', finanzierungController.deleteFinanzierung);

module.exports = router;
