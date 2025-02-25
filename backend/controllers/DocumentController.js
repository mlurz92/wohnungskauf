const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

module.exports = (db) => ({
  uploadDocument: upload.single('file'),
  saveDocument: (req, res) => {
    const { notes, tags } = req.body;
    const tagsStr = JSON.stringify(tags || []);
    const document = {
      userId: req.user.id,
      filename: req.file.originalname,
      path: req.file.path,
      version: 1,
      notes,
      uploadDate: new Date().toISOString(),
      tags: tagsStr,
    };
    db.run(
      'INSERT INTO documents (userId, filename, path, version, notes, uploadDate, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [document.userId, document.filename, document.path, document.version, document.notes, document.uploadDate, document.tags],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...document });
      }
    );
  },
  getDocuments: (req, res) => {
    db.all('SELECT * FROM documents WHERE userId = ?', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(row => ({ ...row, tags: JSON.parse(row.tags) })));
    });
  },
  updateDocument: (req, res) => {
    const { id, notes, tags } = req.body;
    const tagsStr = JSON.stringify(tags || []);
    db.run('UPDATE documents SET notes = ?, tags = ? WHERE id = ?', [notes, tagsStr, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Document updated' });
    });
  },
});