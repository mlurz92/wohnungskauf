// Datei: backend/routes/extendedRoutes.js

const express = require('express');
const router = express.Router();

const extendedDataController = require('../controllers/extendedDataController');

// Route für stadtweite statistische Daten
router.get('/statistics', extendedDataController.fetchStatisticsData);

// Route für Verkehrssicherheits- und Überwachungsdaten
router.get('/traffic', extendedDataController.fetchTrafficData);

// Route für Naturgefahren-Daten (Starkregen, Luftqualität, etc.)
router.get('/nature', extendedDataController.fetchNatureHazardData);

// Route für Infrastruktur- und Investitionsdaten
router.get('/investments', extendedDataController.fetchInvestmentData);

// Route für aggregierte Wohnmarktanalysen und Preistrends
router.get('/market', extendedDataController.fetchMarketTrends);

module.exports = router;