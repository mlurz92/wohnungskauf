const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => ({
  register: async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email],
      function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ message: 'User registered' });
      }
    );
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err || !user) return res.status(404).json({ message: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  },
});
