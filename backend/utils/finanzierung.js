// Datei: backend/utils/finanzierung.js
function berechneMonatlicheRate(darlehensHoehe, zinssatzProJahr, laufzeitInJahren) {
    const zinssatzProMonat = (zinssatzProJahr / 12) / 100;
    const anzahlMonate = laufzeitInJahren * 12;
    return (darlehensHoehe * zinssatzProMonat) / (1 - Math.pow(1 + zinssatzProMonat, -anzahlMonate));
  }
  
  module.exports = { berechneMonatlicheRate };
  