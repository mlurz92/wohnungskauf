// Datei: backend/routes/dokumentRoutes.js
const express = require('express');
const router = express.Router();
const dokumentController = require('../controllers/dokumentController');
const multer = require('multer');

// Konfiguration von multer für Datei-Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', dokumentController.getAllDokumente);
router.get('/:id', dokumentController.getDokumentById);
router.post('/', upload.single('file'), dokumentController.createDokument);
router.put('/:id', upload.single('file'), dokumentController.updateDokument);
router.delete('/:id', dokumentController.deleteDokument);

module.exports = router;
