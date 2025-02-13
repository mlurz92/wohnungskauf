<!-- Datei: frontend/src/views/TerminView.vue -->
<template>
    <div class="termin-view">
      <h1>Terminkoordination</h1>
      <div v-for="termin in termine" :key="termin.id" class="termin-item">
        <h3>{{ termin.beschreibung }}</h3>
        <p>Datum/Uhrzeit: {{ termin.datumUhrzeit }}</p>
        <p>Ort: {{ termin.ort }}</p>
        <p>Kontakt ID: {{ termin.kontaktId }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TerminView',
    data() {
      return {
        termine: [
          // Beispielhafte Daten – in einer realen Anwendung vom Backend laden
          { id: '1', beschreibung: 'Besichtigungstermin Wohnung A', datumUhrzeit: '2025-03-15T10:00', ort: 'Adresse A', kontaktId: '1' },
          { id: '2', beschreibung: 'Notartermin', datumUhrzeit: '2025-03-20T14:00', ort: 'Notariat', kontaktId: '2' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .termin-view {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  .termin-item {
    padding: 10px;
    border-bottom: 1px solid #444;
  }
  </style>
  