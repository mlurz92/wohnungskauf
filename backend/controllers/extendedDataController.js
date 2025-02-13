// Datei: backend/controllers/extendedDataController.js

const axios = require('axios');

// Einfaches In-Memory-Caching (Cache-Zeitraum in Millisekunden, z.B. 10 Minuten)
const CACHE_DURATION = 10 * 60 * 1000;
const cache = {
  statistics: { data: null, expires: 0 },
  traffic: { data: null, expires: 0 },
  nature: { data: null, expires: 0 },
  investments: { data: null, expires: 0 },
  market: { data: null, expires: 0 }
};

/**
 * Helper function, um Daten mit Caching abzurufen.
 * @param {String} key - Cache-Schlüssel, z.B. "statistics"
 * @param {Function} fetchFn - Asynchrone Funktion, die die Daten abruft.
 */
async function getCachedData(key, fetchFn) {
  if (cache[key].data && Date.now() < cache[key].expires) {
    return cache[key].data;
  }
  const data = await fetchFn();
  cache[key] = { data, expires: Date.now() + CACHE_DURATION };
  return data;
}

/**
 * Holt stadtweite statistische Daten (z.B. vom Leipziger Informationssystem).
 */
async function fetchStatisticsData(req, res) {
  try {
    const data = await getCachedData('statistics', async () => {
      const apiUrl = process.env.STATISTICS_API_URL; // z.B. "https://statistik.leipzig.de/api/statcity"
      const response = await axios.get(apiUrl);
      return response.data;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching statistics data:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve statistics data" });
  }
}

/**
 * Holt aktuelle Verkehrssicherheitsdaten (z.B. mobile Blitzer, Radarfallen, Verkehrsfluss).
 */
async function fetchTrafficData(req, res) {
  try {
    const data = await getCachedData('traffic', async () => {
      const apiUrl = process.env.TRAFFIC_API_URL; // z.B. "https://api.leipzig-traffic.de/traffic"
      const response = await axios.get(apiUrl);
      return response.data;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching traffic data:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve traffic data" });
  }
}

/**
 * Holt Daten zu Naturgefahren (z.B. Starkregen, Luftqualität) via externe Wetter-APIs.
 */
async function fetchNatureHazardData(req, res) {
  try {
    const data = await getCachedData('nature', async () => {
      const apiUrl = process.env.NATURE_API_URL; // z.B. "https://api.nature-leipzig.de/hazards"
      const response = await axios.get(apiUrl);
      return response.data;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching nature hazard data:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve nature hazard data" });
  }
}

/**
 * Holt Informationen zu geplanten Investitions- und Infrastrukturprojekten.
 */
async function fetchInvestmentData(req, res) {
  try {
    const data = await getCachedData('investments', async () => {
      const apiUrl = process.env.INVESTMENT_API_URL; // z.B. "https://api.leipzig-invest.de/projects"
      const response = await axios.get(apiUrl);
      return response.data;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching investment data:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve investment data" });
  }
}

/**
 * Holt aggregierte Wohnmarktanalysen und Preistrends.
 */
async function fetchMarketTrends(req, res) {
  try {
    const data = await getCachedData('market', async () => {
      const apiUrl = process.env.MARKET_API_URL; // z.B. "https://api.immobiliendaten.de/market/trends"
      const response = await axios.get(apiUrl);
      return response.data;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching market trends data:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve market trends data" });
  }
}

module.exports = {
  fetchStatisticsData,
  fetchTrafficData,
  fetchNatureHazardData,
  fetchInvestmentData,
  fetchMarketTrends
};