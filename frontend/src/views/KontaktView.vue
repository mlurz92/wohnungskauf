<!-- Datei: frontend/src/views/KontaktView.vue -->
<template>
    <div class="kontakt-view">
      <h1>Kontaktmanagement</h1>
      <div v-for="contact in contacts" :key="contact.id" class="contact-item">
        <h3>{{ contact.name }} ({{ contact.typ }})</h3>
        <p>Telefon: {{ contact.telefon }}</p>
        <p>Email: {{ contact.email }}</p>
        <p>Adresse: {{ contact.adresse }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KontaktView',
    data() {
      return {
        contacts: [
          // Beispielhafte Daten – in einer realen Anwendung vom Backend laden
          { id: '1', typ: 'BANKBERATER', name: 'Max Mustermann', telefon: '123456789', email: 'max@example.com', adresse: 'Musterstraße 1' },
          { id: '2', typ: 'MAKLER', name: 'Erika Musterfrau', telefon: '987654321', email: 'erika@example.com', adresse: 'Beispielweg 5' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .kontakt-view {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  .contact-item {
    padding: 10px;
    border-bottom: 1px solid #444;
  }
  </style>
  