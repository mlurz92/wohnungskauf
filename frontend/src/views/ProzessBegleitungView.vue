<!-- Datei: frontend/src/views/ProzessBegleitungView.vue -->
<template>
    <div class="prozess-begleitung-view">
      <h1>Schrittweise Begleitung bis zum Kaufabschluss</h1>
      <div v-for="checklist in checklists" :key="checklist.id" class="checklist-item">
        <h3>{{ checklist.title }}</h3>
        <ul>
          <li v-for="item in checklist.items" :key="item.id">
            <input type="checkbox" v-model="item.done" /> {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProzessBegleitungView',
    data() {
      return {
        checklists: [
          // Beispielhafte Daten – in einer realen Anwendung dynamisch generiert oder vom Backend geladen
          {
            id: '1',
            title: 'Vor der Besichtigung',
            items: [
              { id: '1-1', text: 'Unterlagen vorbereiten', done: false },
              { id: '1-2', text: 'Termin bestätigen', done: true }
            ]
          },
          {
            id: '2',
            title: 'Nach Kaufzusage',
            items: [
              { id: '2-1', text: 'Finanzierungsbestätigung einholen', done: false },
              { id: '2-2', text: 'Vertragsentwurf prüfen', done: false }
            ]
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .prozess-begleitung-view {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  .checklist-item {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #222;
    border-radius: 5px;
  }
  .checklist-item h3 {
    margin-bottom: 10px;
  }
  </style>
  