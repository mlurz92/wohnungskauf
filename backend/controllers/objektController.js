// Datei: backend/controllers/objektController.js
const db = require('../database/init');

exports.getAllObjekte = (req, res) => {
  db.all("SELECT * FROM Objekt", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Objekte", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getObjektById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Objekt WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Objekt", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Objekt not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createObjekt = (req, res) => {
  const { id, titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer } = req.body;
  db.run(
    "INSERT INTO Objekt (id, titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer],
    function(err) {
      if (err) {
        console.error("Error creating Objekt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer });
      }
    }
  );
};

exports.updateObjekt = (req, res) => {
  const id = req.params.id;
  const { titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer } = req.body;
  db.run(
    "UPDATE Objekt SET titel = ?, beschreibung = ?, lage = ?, kaufpreis = ?, wohnflaeche = ?, anzahlZimmer = ? WHERE id = ?",
    [titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer, id],
    function(err) {
      if (err) {
        console.error("Error updating Objekt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, titel, beschreibung, lage, kaufpreis, wohnflaeche, anzahlZimmer });
      }
    }
  );
};

exports.deleteObjekt = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Objekt WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting Objekt", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Objekt deleted successfully" });
    }
  });
};
