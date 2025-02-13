// Datei: backend/controllers/prozessController.js
const db = require('../database/init');

exports.getAllProzessSchritte = (req, res) => {
  db.all("SELECT * FROM ProzessSchritt", [], (err, rows) => {
    if (err) {
      console.error("Error fetching ProzessSchritt", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getProzessSchrittById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM ProzessSchritt WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching ProzessSchritt", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "ProzessSchritt not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createProzessSchritt = (req, res) => {
  const { id, name, sortIndex, erledigteAufgaben, gesamtAufgaben } = req.body;
  db.run(
    "INSERT INTO ProzessSchritt (id, name, sortIndex, erledigteAufgaben, gesamtAufgaben) VALUES (?, ?, ?, ?, ?)",
    [id, name, sortIndex, erledigteAufgaben, gesamtAufgaben],
    function(err) {
      if (err) {
        console.error("Error creating ProzessSchritt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, name, sortIndex, erledigteAufgaben, gesamtAufgaben });
      }
    }
  );
};

exports.updateProzessSchritt = (req, res) => {
  const id = req.params.id;
  const { name, sortIndex, erledigteAufgaben, gesamtAufgaben } = req.body;
  db.run(
    "UPDATE ProzessSchritt SET name = ?, sortIndex = ?, erledigteAufgaben = ?, gesamtAufgaben = ? WHERE id = ?",
    [name, sortIndex, erledigteAufgaben, gesamtAufgaben, id],
    function(err) {
      if (err) {
        console.error("Error updating ProzessSchritt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, name, sortIndex, erledigteAufgaben, gesamtAufgaben });
      }
    }
  );
};

exports.deleteProzessSchritt = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM ProzessSchritt WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting ProzessSchritt", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "ProzessSchritt deleted successfully" });
    }
  });
};
