// Datei: backend/database/init.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wohnungskauf.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  // Tabelle ProzessSchritt
  db.run(`CREATE TABLE IF NOT EXISTS ProzessSchritt (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sortIndex INTEGER,
    erledigteAufgaben INTEGER,
    gesamtAufgaben INTEGER
  )`, (err) => {
    if (err) console.error("Error creating table ProzessSchritt", err);
  });

  // Tabelle Aufgabe
  db.run(`CREATE TABLE IF NOT EXISTS Aufgabe (
    id TEXT PRIMARY KEY,
    titel TEXT NOT NULL,
    beschreibung TEXT,
    status TEXT,
    prozessSchrittId TEXT,
    FOREIGN KEY(prozessSchrittId) REFERENCES ProzessSchritt(id)
  )`, (err) => {
    if (err) console.error("Error creating table Aufgabe", err);
  });

  // Tabelle Finanzierung
  db.run(`CREATE TABLE IF NOT EXISTS Finanzierung (
    id TEXT PRIMARY KEY,
    darlehensHoehe REAL,
    zinssatzProJahr REAL,
    laufzeitInJahren INTEGER,
    monatlicheRate REAL
  )`, (err) => {
    if (err) console.error("Error creating table Finanzierung", err);
  });

  // Tabelle Dokument
  db.run(`CREATE TABLE IF NOT EXISTS Dokument (
    id TEXT PRIMARY KEY,
    titel TEXT NOT NULL,
    dateiPfad TEXT,
    dateiBlob BLOB,
    version INTEGER,
    erstelltAm TEXT,
    aktualisiertAm TEXT
  )`, (err) => {
    if (err) console.error("Error creating table Dokument", err);
  });

  // Tabelle DokumentNotiz
  db.run(`CREATE TABLE IF NOT EXISTS DokumentNotiz (
    id TEXT PRIMARY KEY,
    notizText TEXT,
    zeitstempel TEXT,
    dokumentId TEXT,
    FOREIGN KEY(dokumentId) REFERENCES Dokument(id)
  )`, (err) => {
    if (err) console.error("Error creating table DokumentNotiz", err);
  });

  // Tabelle Kontakt
  db.run(`CREATE TABLE IF NOT EXISTS Kontakt (
    id TEXT PRIMARY KEY,
    typ TEXT,
    name TEXT NOT NULL,
    telefon TEXT,
    email TEXT,
    adresse TEXT
  )`, (err) => {
    if (err) console.error("Error creating table Kontakt", err);
  });

  // Tabelle Objekt
  db.run(`CREATE TABLE IF NOT EXISTS Objekt (
    id TEXT PRIMARY KEY,
    titel TEXT NOT NULL,
    beschreibung TEXT,
    lage TEXT,
    kaufpreis REAL,
    wohnflaeche REAL,
    anzahlZimmer INTEGER
  )`, (err) => {
    if (err) console.error("Error creating table Objekt", err);
  });

  // Tabelle ObjektBewertung
  db.run(`CREATE TABLE IF NOT EXISTS ObjektBewertung (
    id TEXT PRIMARY KEY,
    objektId TEXT,
    kriteriumName TEXT,
    score REAL,
    FOREIGN KEY(objektId) REFERENCES Objekt(id)
  )`, (err) => {
    if (err) console.error("Error creating table ObjektBewertung", err);
  });

  // Tabelle Termin
  db.run(`CREATE TABLE IF NOT EXISTS Termin (
    id TEXT PRIMARY KEY,
    beschreibung TEXT,
    datumUhrzeit TEXT,
    ort TEXT,
    kontaktId TEXT,
    FOREIGN KEY(kontaktId) REFERENCES Kontakt(id)
  )`, (err) => {
    if (err) console.error("Error creating table Termin", err);
  });

  console.log("Database tables created or verified.");
});

module.exports = db;
