// Datei: backend/routes/aufgabeRoutes.js
const express = require('express');
const router = express.Router();
const aufgabeController = require('../controllers/aufgabeController');

router.get('/', aufgabeController.getAllAufgaben);
router.get('/:id', aufgabeController.getAufgabeById);
router.post('/', aufgabeController.createAufgabe);
router.put('/:id', aufgabeController.updateAufgabe);
router.delete('/:id', aufgabeController.deleteAufgabe);

module.exports = router;