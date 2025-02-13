<!-- Aktualisierte Datei: frontend/src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Willkommen zur Wohnungskauf Anwendung</h1>
    <nav>
      <ul>
        <li><router-link to="/step-by-step">Step-by-Step Visualisierung</router-link></li>
        <li><router-link to="/finanzierung">Finanzierungs- und Budgetplanung</router-link></li>
        <li><router-link to="/kontakte">Kontaktmanagement</router-link></li>
        <li><router-link to="/objektvergleich">Objektvergleich</router-link></li>
        <li><router-link to="/termine">Terminkoordination</router-link></li>
        <li><router-link to="/prozess-begleitung">Schrittweise Begleitung</router-link></li>
        <li><router-link to="/erweiterungen">Erweiterungen</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 20px;
}
nav ul {
  list-style: none;
  padding: 0;
}
nav li {
  margin: 10px 0;
}
</style>
