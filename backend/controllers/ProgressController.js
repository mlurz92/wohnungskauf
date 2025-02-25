module.exports = (db) => ({
  getProgress: (req, res) => {
    db.get('SELECT steps, badges FROM progress WHERE userId = ?', [req.user.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        steps: row ? JSON.parse(row.steps) : [],
        badges: row ? JSON.parse(row.badges) : [],
      });
    });
  },
  updateProgress: (req, res) => {
    const { steps, badges } = req.body;
    const stepsStr = JSON.stringify(steps || []);
    const badgesStr = JSON.stringify(badges || []);
    db.run(
      'INSERT OR REPLACE INTO progress (userId, steps, badges) VALUES (?, ?, ?)',
      [req.user.id, stepsStr, badgesStr],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Progress updated' });
      }
    );
  },
});