// Datei: backend/controllers/terminController.js
const db = require('../database/init');

exports.getAllTermine = (req, res) => {
  db.all("SELECT * FROM Termin", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Termine", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getTerminById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Termin WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Termin", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Termin not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createTermin = (req, res) => {
  const { id, beschreibung, datumUhrzeit, ort, kontaktId } = req.body;
  db.run(
    "INSERT INTO Termin (id, beschreibung, datumUhrzeit, ort, kontaktId) VALUES (?, ?, ?, ?, ?)",
    [id, beschreibung, datumUhrzeit, ort, kontaktId],
    function(err) {
      if (err) {
        console.error("Error creating Termin", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, beschreibung, datumUhrzeit, ort, kontaktId });
      }
    }
  );
};

exports.updateTermin = (req, res) => {
  const id = req.params.id;
  const { beschreibung, datumUhrzeit, ort, kontaktId } = req.body;
  db.run(
    "UPDATE Termin SET beschreibung = ?, datumUhrzeit = ?, ort = ?, kontaktId = ? WHERE id = ?",
    [beschreibung, datumUhrzeit, ort, kontaktId, id],
    function(err) {
      if (err) {
        console.error("Error updating Termin", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, beschreibung, datumUhrzeit, ort, kontaktId });
      }
    }
  );
};

exports.deleteTermin = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Termin WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting Termin", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Termin deleted successfully" });
    }
  });
};
