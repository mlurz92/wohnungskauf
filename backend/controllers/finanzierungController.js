// Datei: backend/controllers/finanzierungController.js
const db = require('../database/init');
const { berechneMonatlicheRate } = require('../utils/finanzierung');

exports.getAllFinanzierung = (req, res) => {
  db.all("SELECT * FROM Finanzierung", [], (err, rows) => {
    if (err) {
      console.error("Error fetching Finanzierung", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getFinanzierungById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Finanzierung WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching Finanzierung", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "Finanzierung not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createFinanzierung = (req, res) => {
  const { id, darlehensHoehe, zinssatzProJahr, laufzeitInJahren } = req.body;
  const monatlicheRate = berechneMonatlicheRate(darlehensHoehe, zinssatzProJahr, laufzeitInJahren);
  db.run(
    "INSERT INTO Finanzierung (id, darlehensHoehe, zinssatzProJahr, laufzeitInJahren, monatlicheRate) VALUES (?, ?, ?, ?, ?)",
    [id, darlehensHoehe, zinssatzProJahr, laufzeitInJahren, monatlicheRate],
    function(err) {
      if (err) {
        console.error("Error creating Finanzierung", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, darlehensHoehe, zinssatzProJahr, laufzeitInJahren, monatlicheRate });
      }
    }
  );
};

exports.updateFinanzierung = (req, res) => {
  const id = req.params.id;
  const { darlehensHoehe, zinssatzProJahr, laufzeitInJahren } = req.body;
  const monatlicheRate = berechneMonatlicheRate(darlehensHoehe, zinssatzProJahr, laufzeitInJahren);
  db.run(
    "UPDATE Finanzierung SET darlehensHoehe = ?, zinssatzProJahr = ?, laufzeitInJahren = ?, monatlicheRate = ? WHERE id = ?",
    [darlehensHoehe, zinssatzProJahr, laufzeitInJahren, monatlicheRate, id],
    function(err) {
      if (err) {
        console.error("Error updating Finanzierung", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, darlehensHoehe, zinssatzProJahr, laufzeitInJahren, monatlicheRate });
      }
    }
  );
};

exports.deleteFinanzierung = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Finanzierung WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting Finanzierung", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Finanzierung deleted successfully" });
    }
  });
};
