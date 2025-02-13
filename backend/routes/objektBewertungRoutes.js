// Datei: backend/routes/objektBewertungRoutes.js
const express = require('express');
const router = express.Router();
const objektBewertungController = require('../controllers/objektBewertungController');

router.get('/', objektBewertungController.getAllObjektBewertungen);
router.get('/:id', objektBewertungController.getObjektBewertungById);
router.post('/', objektBewertungController.createObjektBewertung);
router.put('/:id', objektBewertungController.updateObjektBewertung);
router.delete('/:id', objektBewertungController.deleteObjektBewertung);

module.exports = router;
