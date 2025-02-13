// Datei: backend/routes/objektRoutes.js
const express = require('express');
const router = express.Router();
const objektController = require('../controllers/objektController');

router.get('/', objektController.getAllObjekte);
router.get('/:id', objektController.getObjektById);
router.post('/', objektController.createObjekt);
router.put('/:id', objektController.updateObjekt);
router.delete('/:id', objektController.deleteObjekt);

module.exports = router;
