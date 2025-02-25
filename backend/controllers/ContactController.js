module.exports = (db) => ({
  getContacts: (req, res) => {
    db.all('SELECT * FROM contacts WHERE userId = ?', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      // JSON-Felder parsen
      res.json(rows.map(row => ({
        ...row,
        tasks: JSON.parse(row.tasks),
        documents: JSON.parse(row.documents),
        history: JSON.parse(row.history)
      })));
    });
  },
  addContact: (req, res) => {
    const { name, role, phone, email, tasks, documents, history } = req.body;
    const tasksStr = JSON.stringify(tasks || []);
    const documentsStr = JSON.stringify(documents || []);
    const historyStr = JSON.stringify(history || []);
    db.run(
      'INSERT INTO contacts (userId, name, role, phone, email, tasks, documents, history) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, role, phone, email, tasksStr, documentsStr, historyStr],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, role, phone, email, tasks, documents, history });
      }
    );
  },
  updateContact: (req, res) => {
    const { id, name, role, phone, email, tasks, documents, history } = req.body;
    const tasksStr = JSON.stringify(tasks || []);
    const documentsStr = JSON.stringify(documents || []);
    const historyStr = JSON.stringify(history || []);
    db.run(
      'UPDATE contacts SET name = ?, role = ?, phone = ?, email = ?, tasks = ?, documents = ?, history = ? WHERE id = ?',
      [name, role, phone, email, tasksStr, documentsStr, historyStr, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contact updated' });
      }
    );
  },
});