// Aktualisierte Datei: backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test-Endpunkt
app.get('/', (req, res) => {
  res.send('Wohnungskauf Backend is running.');
});

// Einbinden der API-Routen
const prozessRoutes = require('./routes/prozessRoutes');
const aufgabeRoutes = require('./routes/aufgabeRoutes');
const finanzierungRoutes = require('./routes/finanzierungRoutes');
const dokumentRoutes = require('./routes/dokumentRoutes');
const dokumentNotizRoutes = require('./routes/dokumentNotizRoutes');
const kontaktRoutes = require('./routes/kontaktRoutes');
const objektRoutes = require('./routes/objektRoutes');
const objektBewertungRoutes = require('./routes/objektBewertungRoutes');
const terminRoutes = require('./routes/terminRoutes');

app.use('/api/prozessschritte', prozessRoutes);
app.use('/api/aufgaben', aufgabeRoutes);
app.use('/api/finanzierung', finanzierungRoutes);
app.use('/api/dokumente', dokumentRoutes);
app.use('/api/dokumentnotizen', dokumentNotizRoutes);
app.use('/api/kontakte', kontaktRoutes);
app.use('/api/objekte', objektRoutes);
app.use('/api/objektbewertungen', objektBewertungRoutes);
app.use('/api/termine', terminRoutes);

// Server starten
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
