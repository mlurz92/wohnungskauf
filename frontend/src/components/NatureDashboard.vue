<template>
    <div class="dashboard nature-dashboard">
      <h2>Naturgefahren & Umweltinformationen</h2>
      <div v-if="loading" class="loading">Lade Umweltdaten...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="chart-container">
          <!-- Canvas für das interaktive Diagramm -->
          <canvas id="natureChart"></canvas>
        </div>
        <ul class="nature-list">
          <li v-for="(value, key) in natureData" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'NatureDashboard',
    data() {
      return {
        natureData: {},
        loading: true,
        error: null,
        chartInstance: null,
      };
    },
    methods: {
      async fetchNature() {
        try {
          const response = await axios.get('/api/extended/nature');
          if(response.data.success) {
            this.natureData = response.data.data;
            this.loading = false;
            this.renderChart();
          } else {
            this.error = 'Umweltdaten konnten nicht geladen werden.';
            this.loading = false;
          }
        } catch (e) {
          console.error("Error fetching nature hazard data:", e);
          this.error = 'Fehler beim Abrufen der Umweltdaten.';
          this.loading = false;
        }
      },
      renderChart() {
        const ctx = document.getElementById('natureChart').getContext('2d');
        // Annahme: natureData ist ein Objekt mit stringbasierten Keys und numerischen Werten
        const labels = Object.keys(this.natureData);
        const dataValues = Object.values(this.natureData);
        
        // Zerstöre vorhandene Chart-Instanz, falls vorhanden
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        
        this.chartInstance = new Chart(ctx, {
          type: 'radar', // Verwendung eines Radar Diagramms für Umweltdaten
          data: {
            labels,
            datasets: [{
              label: 'Umweltparameter',
              data: dataValues,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: 'easeOutQuart'
            },
            scales: {
              r: {
                beginAtZero: true
              }
            }
          }
        });
      }
    },
    mounted() {
      this.fetchNature();
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .nature-dashboard {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
    transform: translateZ(0); /* GPU-optimiert */
  }
  .loading {
    font-size: 18px;
    text-align: center;
  }
  .error {
    color: #e74c3c;
    font-size: 18px;
    text-align: center;
  }
  .chart-container {
    position: relative;
    height: 300px;
    margin-bottom: 20px;
  }
  .nature-list {
    list-style: none;
    padding: 0;
  }
  .nature-list li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease;
  }
  .nature-list li:hover {
    background-color: #333;
    transform: scale(1.02); /* GPU-optimiert */
  }
  </style>