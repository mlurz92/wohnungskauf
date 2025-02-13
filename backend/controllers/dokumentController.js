// Datei: backend/controllers/dokumentController.js
const db = require('../database/init');
const fs = require('fs');

exports.getAllDokumente = (req, res) => {
  db.all("SELECT * FROM Dokument", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Dokumente", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getDokumentById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Dokument WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Dokument", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Dokument not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createDokument = (req, res) => {
  const { id, titel, version } = req.body;
  const erstelltAm = new Date().toISOString();
  const aktualisiertAm = erstelltAm;
  let dateiPfad = null;
  if (req.file) {
    dateiPfad = req.file.path;
  }
  db.run(
    "INSERT INTO Dokument (id, titel, dateiPfad, version, erstelltAm, aktualisiertAm) VALUES (?, ?, ?, ?, ?, ?)",
    [id, titel, dateiPfad, version, erstelltAm, aktualisiertAm],
    function(err) {
      if (err) {
        console.error("Error creating Dokument", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, titel, dateiPfad, version, erstelltAm, aktualisiertAm });
      }
    }
  );
};

exports.updateDokument = (req, res) => {
  const id = req.params.id;
  const { titel, version } = req.body;
  const aktualisiertAm = new Date().toISOString();
  let dateiPfad = null;
  if (req.file) {
    dateiPfad = req.file.path;
  }
  const query = dateiPfad ?
    "UPDATE Dokument SET titel = ?, dateiPfad = ?, version = ?, aktualisiertAm = ? WHERE id = ?" :
    "UPDATE Dokument SET titel = ?, version = ?, aktualisiertAm = ? WHERE id = ?";
  const params = dateiPfad ? [titel, dateiPfad, version, aktualisiertAm, id] : [titel, version, aktualisiertAm, id];

  db.run(query, params, function(err) {
    if (err) {
      console.error("Error updating Dokument", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ id, titel, dateiPfad, version, aktualisiertAm });
    }
  });
};

exports.deleteDokument = (req, res) => {
  const id = req.params.id;
  db.get("SELECT dateiPfad FROM Dokument WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Dokument for deletion", err);
      res.status(500).json({ error: "Database error" });
    } else {
      if (row && row.dateiPfad) {
        fs.unlink(row.dateiPfad, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file", unlinkErr);
          }
        });
      }
      db.run("DELETE FROM Dokument WHERE id = ?", [id], function(err) {
        if (err) {
          console.error("Error deleting Dokument", err);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json({ message: "Dokument deleted successfully" });
        }
      });
    }
  });
};
