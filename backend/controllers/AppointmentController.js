module.exports = (db) => ({
  getAppointments: (req, res) => {
    db.all('SELECT * FROM appointments WHERE userId = ?', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      // Photos als Array zurückgeben
      res.json(rows.map(row => ({ ...row, photos: JSON.parse(row.photos) })));
    });
  },
  addAppointment: (req, res) => {
    const { title, date, notes, photos, reminder, category } = req.body;
    const photosStr = JSON.stringify(photos || []);
    db.run(
      'INSERT INTO appointments (userId, title, date, notes, photos, reminder, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, date, notes, photosStr, reminder ? 1 : 0, category],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, date, notes, photos, reminder, category });
      }
    );
  },
  updateAppointment: (req, res) => {
    const { id, title, date, notes, photos, reminder, category } = req.body;
    const photosStr = JSON.stringify(photos || []);
    db.run(
      'UPDATE appointments SET title = ?, date = ?, notes = ?, photos = ?, reminder = ?, category = ? WHERE id = ?',
      [title, date, notes, photosStr, reminder ? 1 : 0, category, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment updated' });
      }
    );
  },
});