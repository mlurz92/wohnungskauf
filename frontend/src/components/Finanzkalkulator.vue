<!-- Datei: frontend/src/components/Finanzkalkulator.vue -->
<template>
    <div class="finanzkalkulator">
      <h2>Finanzkalkulator</h2>
      <form @submit.prevent="calculate">
        <div>
          <label for="darlehen">Darlehenshöhe:</label>
          <input type="number" v-model.number="darlehensHoehe" required />
        </div>
        <div>
          <label for="zinssatz">Zinssatz p.a. (%):</label>
          <input type="number" v-model.number="zinssatzProJahr" required step="0.01" />
        </div>
        <div>
          <label for="laufzeit">Laufzeit (Jahre):</label>
          <input type="number" v-model.number="laufzeitInJahren" required />
        </div>
        <button type="submit">Berechnen</button>
      </form>
      <transition name="fade">
        <div v-if="monatlicheRate !== null" class="result">
          <h3>Monatliche Rate: {{ monatlicheRate.toFixed(2) }} €</h3>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Finanzkalkulator',
    data() {
      return {
        darlehensHoehe: null,
        zinssatzProJahr: null,
        laufzeitInJahren: null,
        monatlicheRate: null
      }
    },
    methods: {
      calculate() {
        const zinssatzProMonat = (this.zinssatzProJahr / 12) / 100;
        const anzahlMonate = this.laufzeitInJahren * 12;
        this.monatlicheRate = (this.darlehensHoehe * zinssatzProMonat) / (1 - Math.pow(1 + zinssatzProMonat, -anzahlMonate));
      }
    }
  }
  </script>
  
  <style scoped>
  .finanzkalkulator {
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 5px;
    color: #fff;
  }
  .finanzkalkulator form div {
    margin-bottom: 10px;
  }
  .finanzkalkulator label {
    margin-right: 10px;
  }
  .finanzkalkulator input {
    padding: 5px;
    border: none;
    border-radius: 3px;
  }
  .finanzkalkulator button {
    padding: 10px 15px;
    background-color: #3498db;
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
  }
  .finanzkalkulator button:hover {
    background-color: #2980b9;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .result {
    margin-top: 20px;
    font-size: 18px;
    color: #2ecc71;
  }
  </style>
  