const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Datenbankverbindung
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) console.error(err);
  else console.log('Connected to SQLite database');
});

// Datenbanktabellen initialisieren
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    steps TEXT,
    badges TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS finance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    equity REAL,
    loanAmount REAL,
    interestRate REAL,
    term INTEGER,
    additionalCosts TEXT,
    budget TEXT,
    scenarios TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    filename TEXT,
    path TEXT,
    version INTEGER,
    notes TEXT,
    uploadDate TEXT,
    expiryDate TEXT,
    tags TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    role TEXT,
    phone TEXT,
    email TEXT,
    tasks TEXT,
    documents TEXT,
    history TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    area REAL,
    rooms INTEGER,
    price REAL,
    criteria TEXT,
    pros TEXT,
    cons TEXT,
    photos TEXT,
    virtualTour TEXT,
    location TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    date TEXT,
    notes TEXT,
    photos TEXT,
    reminder INTEGER,
    priority TEXT,
    category TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
});

// Routen
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');
const financeRoutes = require('./routes/financeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reportRoutes = require('./routes/reportRoutes'); // Neu hinzugefügt

app.use('/api/users', userRoutes(db));
app.use('/api/progress', progressRoutes(db));
app.use('/api/finance', financeRoutes(db));
app.use('/api/documents', documentRoutes(db));
app.use('/api/contacts', contactRoutes(db));
app.use('/api/properties', propertyRoutes(db));
app.use('/api/appointments', appointmentRoutes(db));
app.use('/api/reports', reportRoutes(db)); // Neu hinzugefügt

// Serverstart
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
