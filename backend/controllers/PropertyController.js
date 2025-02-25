module.exports = (db) => ({
  getProperties: (req, res) => {
    db.all('SELECT * FROM properties WHERE userId = ?', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      // JSON-Felder parsen
      res.json(rows.map(row => ({
        ...row,
        criteria: JSON.parse(row.criteria),
        pros: JSON.parse(row.pros),
        cons: JSON.parse(row.cons),
        photos: JSON.parse(row.photos),
        virtualTour: row.virtualTour,
        location: row.location
      })));
    });
  },
  addProperty: (req, res) => {
    const { name, area, rooms, price, criteria, pros, cons, photos, virtualTour, location } = req.body;
    const criteriaStr = JSON.stringify(criteria || []);
    const prosStr = JSON.stringify(pros || []);
    const consStr = JSON.stringify(cons || []);
    const photosStr = JSON.stringify(photos || []);
    db.run(
      'INSERT INTO properties (userId, name, area, rooms, price, criteria, pros, cons, photos, virtualTour, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, area, rooms, price, criteriaStr, prosStr, consStr, photosStr, virtualTour, location],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, area, rooms, price, criteria, pros, cons, photos, virtualTour, location });
      }
    );
  },
  updateProperty: (req, res) => {
    const { id, name, area, rooms, price, criteria, pros, cons, photos, virtualTour, location } = req.body;
    const criteriaStr = JSON.stringify(criteria || []);
    const prosStr = JSON.stringify(pros || []);
    const consStr = JSON.stringify(cons || []);
    const photosStr = JSON.stringify(photos || []);
    db.run(
      'UPDATE properties SET name = ?, area = ?, rooms = ?, price = ?, criteria = ?, pros = ?, cons = ?, photos = ?, virtualTour = ?, location = ? WHERE id = ?',
      [name, area, rooms, price, criteriaStr, prosStr, consStr, photosStr, virtualTour, location, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Property updated' });
      }
    );
  },
});