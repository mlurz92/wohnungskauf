// Datei: backend/controllers/objektBewertungController.js
const db = require('../database/init');

exports.getAllObjektBewertungen = (req, res) => {
  db.all("SELECT * FROM ObjektBewertung", [], (err, rows) => {
    if (err) {
      console.error("Error fetching ObjektBewertungen", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
};

exports.getObjektBewertungById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM ObjektBewertung WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching ObjektBewertung", err);
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ error: "ObjektBewertung not found" });
    } else {
      res.json(row);
    }
  });
};

exports.createObjektBewertung = (req, res) => {
  const { id, objektId, kriteriumName, score } = req.body;
  db.run(
    "INSERT INTO ObjektBewertung (id, objektId, kriteriumName, score) VALUES (?, ?, ?, ?)",
    [id, objektId, kriteriumName, score],
    function(err) {
      if (err) {
        console.error("Error creating ObjektBewertung", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.status(201).json({ id, objektId, kriteriumName, score });
      }
    }
  );
};

exports.updateObjektBewertung = (req, res) => {
  const id = req.params.id;
  const { objektId, kriteriumName, score } = req.body;
  db.run(
    "UPDATE ObjektBewertung SET objektId = ?, kriteriumName = ?, score = ? WHERE id = ?",
    [objektId, kriteriumName, score, id],
    function(err) {
      if (err) {
        console.error("Error updating ObjektBewertung", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id, objektId, kriteriumName, score });
      }
    }
  );
};

exports.deleteObjektBewertung = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM ObjektBewertung WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting ObjektBewertung", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "ObjektBewertung deleted successfully" });
    }
  });
};
