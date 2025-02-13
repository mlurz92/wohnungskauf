// Datei: backend/controllers/dokumentNotizController.js
const db = require('../database/init');

exports.getAllDokumentNotizen = (req, res) => {
  db.all("SELECT * FROM DokumentNotiz", [], (err, rows) => {
    if (err) {
      console.error("Error fetching DokumentNotizen", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getDokumentNotizById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM DokumentNotiz WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching DokumentNotiz", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "DokumentNotiz not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createDokumentNotiz = (req, res) => {
  const { id, notizText, dokumentId } = req.body;
  const zeitstempel = new Date().toISOString();
  db.run(
    "INSERT INTO DokumentNotiz (id, notizText, zeitstempel, dokumentId) VALUES (?, ?, ?, ?)",
    [id, notizText, zeitstempel, dokumentId],
    function(err) {
      if (err) {
        console.error("Error creating DokumentNotiz", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, notizText, zeitstempel, dokumentId });
      }
    }
  );
};

exports.updateDokumentNotiz = (req, res) => {
  const id = req.params.id;
  const { notizText } = req.body;
  const zeitstempel = new Date().toISOString();
  db.run(
    "UPDATE DokumentNotiz SET notizText = ?, zeitstempel = ? WHERE id = ?",
    [notizText, zeitstempel, id],
    function(err) {
      if (err) {
        console.error("Error updating DokumentNotiz", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, notizText, zeitstempel });
      }
    }
  );
};

exports.deleteDokumentNotiz = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM DokumentNotiz WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting DokumentNotiz", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "DokumentNotiz deleted successfully" });
    }
  });
};
