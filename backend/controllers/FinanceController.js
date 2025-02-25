module.exports = (db) => ({
  getFinance: (req, res) => {
    db.get('SELECT * FROM finance WHERE userId = ?', [req.user.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.json(null);
      const finance = {
        ...row,
        additionalCosts: JSON.parse(row.additionalCosts),
        budget: JSON.parse(row.budget),
      };
      const monthlyRate = calculateMonthlyRate(finance);
      res.json({ ...finance, monthlyRate });
    });
  },
  updateFinance: (req, res) => {
    const { equity, loanAmount, interestRate, term, additionalCosts, budget } = req.body;
    const additionalCostsStr = JSON.stringify(additionalCosts);
    const budgetStr = JSON.stringify(budget);
    db.run(
      'INSERT OR REPLACE INTO finance (userId, equity, loanAmount, interestRate, term, additionalCosts, budget) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, equity, loanAmount, interestRate, term, additionalCostsStr, budgetStr],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Finance updated' });
      }
    );
  },
  // Neue Funktion: Berichtsgenerierung
  generateReport: (req, res) => {
    // Platzhalter für zukünftige PDF-Generierung (z. B. mit jsPDF)
    res.json({ message: 'Report generated' });
  },
});

function calculateMonthlyRate(finance) {
  const monthlyInterest = finance.interestRate / 100 / 12;
  const months = finance.term * 12;
  return (finance.loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));
}