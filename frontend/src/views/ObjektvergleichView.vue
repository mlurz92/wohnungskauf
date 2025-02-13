<!-- Datei: frontend/src/views/ObjektvergleichView.vue -->
<template>
    <div class="objektvergleich-view">
      <h1>Objektvergleich</h1>
      <div v-for="object in objects" :key="object.id" class="object-item">
        <h3>{{ object.titel }}</h3>
        <p>{{ object.beschreibung }}</p>
        <p>Lage: {{ object.lage }}</p>
        <p>Kaufpreis: {{ object.kaufpreis }} €</p>
        <p>Wohnfläche: {{ object.wohnflaeche }} m²</p>
        <p>Anzahl Zimmer: {{ object.anzahlZimmer }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ObjektvergleichView',
    data() {
      return {
        objects: [
          // Beispielhafte Daten – in einer realen Anwendung vom Backend laden
          { id: '1', titel: 'Wohnung A', beschreibung: 'Schöne Wohnung im Stadtzentrum', lage: 'Mitte', kaufpreis: 250000, wohnflaeche: 80, anzahlZimmer: 3 },
          { id: '2', titel: 'Wohnung B', beschreibung: 'Moderne Wohnung mit Balkon', lage: 'Süd', kaufpreis: 300000, wohnflaeche: 90, anzahlZimmer: 4 }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .objektvergleich-view {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  .object-item {
    padding: 10px;
    border-bottom: 1px solid #444;
  }
  </style>
  