// Datei: backend/controllers/kontaktController.js
const db = require('../database/init');

exports.getAllKontakte = (req, res) => {
  db.all("SELECT * FROM Kontakt", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Kontakte", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getKontaktById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Kontakt WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Kontakt", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Kontakt not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createKontakt = (req, res) => {
  const { id, typ, name, telefon, email, adresse } = req.body;
  db.run(
    "INSERT INTO Kontakt (id, typ, name, telefon, email, adresse) VALUES (?, ?, ?, ?, ?, ?)",
    [id, typ, name, telefon, email, adresse],
    function(err) {
      if (err) {
        console.error("Error creating Kontakt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, typ, name, telefon, email, adresse });
      }
    }
  );
};

exports.updateKontakt = (req, res) => {
  const id = req.params.id;
  const { typ, name, telefon, email, adresse } = req.body;
  db.run(
    "UPDATE Kontakt SET typ = ?, name = ?, telefon = ?, email = ?, adresse = ? WHERE id = ?",
    [typ, name, telefon, email, adresse, id],
    function(err) {
      if (err) {
        console.error("Error updating Kontakt", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, typ, name, telefon, email, adresse });
      }
    }
  );
};

exports.deleteKontakt = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Kontakt WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting Kontakt", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Kontakt deleted successfully" });
    }
  });
};
