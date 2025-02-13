// Datei: backend/routes/kontaktRoutes.js
const express = require('express');
const router = express.Router();
const kontaktController = require('../controllers/kontaktController');

router.get('/', kontaktController.getAllKontakte);
router.get('/:id', kontaktController.getKontaktById);
router.post('/', kontaktController.createKontakt);
router.put('/:id', kontaktController.updateKontakt);
router.delete('/:id', kontaktController.deleteKontakt);

module.exports = router;
