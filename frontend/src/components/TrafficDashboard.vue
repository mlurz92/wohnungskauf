<template>
    <div class="dashboard traffic-dashboard">
      <h2>Verkehrsdaten & Sicherheitsinformationen</h2>
      <div v-if="loading" class="loading">Lade Verkehrsdaten...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="chart-container">
          <!-- Canvas für das Verkehrsdaten-Diagramm -->
          <canvas id="trafficChart"></canvas>
        </div>
        <ul class="traffic-list">
          <li v-for="(value, key) in trafficData" :key="key">
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
    name: 'TrafficDashboard',
    data() {
      return {
        trafficData: {},
        loading: true,
        error: null,
        chartInstance: null,
      };
    },
    methods: {
      async fetchTraffic() {
        try {
          const response = await axios.get('/api/extended/traffic');
          if(response.data.success) {
            this.trafficData = response.data.data;
            this.loading = false;
            this.renderChart();
          } else {
            this.error = 'Verkehrsdaten konnten nicht geladen werden.';
            this.loading = false;
          }
        } catch (e) {
          console.error("Error fetching traffic data:", e);
          this.error = 'Fehler beim Abrufen der Verkehrsdaten.';
          this.loading = false;
        }
      },
      renderChart() {
        const ctx = document.getElementById('trafficChart').getContext('2d');
        // Datenaufbereitung: Annahme, dass trafficData ein Objekt mit stringbasierten Keys und numerischen Werten ist.
        const labels = Object.keys(this.trafficData);
        const dataValues = Object.values(this.trafficData);
        
        // Vorhandene Chart-Instanz zerstören, falls vorhanden.
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        
        this.chartInstance = new Chart(ctx, {
          type: 'line', // Verwendung eines Liniendiagramms für Verkehrsfluss-Daten
          data: {
            labels,
            datasets: [{
              label: 'Verkehrsdaten',
              data: dataValues,
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 2,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: 'easeOutQuart' // GPU-freundlicher Easing-Effekt
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }
        });
      }
    },
    mounted() {
      this.fetchTraffic();
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .traffic-dashboard {
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
  .traffic-list {
    list-style: none;
    padding: 0;
  }
  .traffic-list li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease;
  }
  .traffic-list li:hover {
    background-color: #333;
    transform: scale(1.02); /* GPU-optimiert */
  }
  </style>