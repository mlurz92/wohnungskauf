// Datei: backend/controllers/aufgabeController.js
const db = require('../database/init');

exports.getAllAufgaben = (req, res) => {
  db.all("SELECT * FROM Aufgabe", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Aufgaben", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getAufgabeById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Aufgabe WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Aufgabe", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Aufgabe not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createAufgabe = (req, res) => {
  const { id, titel, beschreibung, status, prozessSchrittId } = req.body;
  db.run(
    "INSERT INTO Aufgabe (id, titel, beschreibung, status, prozessSchrittId) VALUES (?, ?, ?, ?, ?)",
    [id, titel, beschreibung, status, prozessSchrittId],
    function(err) {
      if (err) {
        console.error("Error creating Aufgabe", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, titel, beschreibung, status, prozessSchrittId });
      }
    }
  );
};

exports.updateAufgabe = (req, res) => {
  const id = req.params.id;
  const { titel, beschreibung, status, prozessSchrittId } = req.body;
  db.run(
    "UPDATE Aufgabe SET titel = ?, beschreibung = ?, status = ?, prozessSchrittId = ? WHERE id = ?",
    [titel, beschreibung, status, prozessSchrittId, id],
    function(err) {
      if (err) {
        console.error("Error updating Aufgabe", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, titel, beschreibung, status, prozessSchrittId });
      }
    }
  );
};

exports.deleteAufgabe = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Aufgabe WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting Aufgabe", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Aufgabe deleted successfully" });
    }
  });
};
