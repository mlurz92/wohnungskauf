// Datei: backend/routes/dokumentNotizRoutes.js
const express = require('express');
const router = express.Router();
const dokumentNotizController = require('../controllers/dokumentNotizController');

router.get('/', dokumentNotizController.getAllDokumentNotizen);
router.get('/:id', dokumentNotizController.getDokumentNotizById);
router.post('/', dokumentNotizController.createDokumentNotiz);
router.put('/:id', dokumentNotizController.updateDokumentNotiz);
router.delete('/:id', dokumentNotizController.deleteDokumentNotiz);

module.exports = router;
