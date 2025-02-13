<!-- Datei: frontend/src/views/FinanzierungsView.vue -->
<template>
    <div class="finanzierungs-view">
      <h1>Finanzierungs- und Budgetplanung</h1>
      <Finanzkalkulator />
    </div>
  </template>
  
  <script>
  import Finanzkalkulator from '../components/Finanzkalkulator.vue';
  
  export default {
    name: 'FinanzierungsView',
    components: {
      Finanzkalkulator
    }
  }
  </script>
  
  <style scoped>
  .finanzierungs-view {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  </style>
  