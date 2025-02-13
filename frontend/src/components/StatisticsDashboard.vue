<template>
    <div class="dashboard statistics-dashboard">
      <h2>Stadtweite Statistiken</h2>
      <div v-if="loading" class="loading">Lade Daten...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="chart-container">
          <!-- Canvas für das interaktive Diagramm -->
          <canvas id="statisticsChart"></canvas>
        </div>
        <ul class="stats-list">
          <li v-for="(value, key) in statsData" :key="key">
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
    name: 'StatisticsDashboard',
    data() {
      return {
        statsData: {},
        loading: true,
        error: null,
        chartInstance: null,
      };
    },
    methods: {
      async fetchStatistics() {
        try {
          const response = await axios.get('/api/extended/statistics');
          if(response.data.success) {
            this.statsData = response.data.data;
            this.loading = false;
            this.renderChart();
          } else {
            this.error = 'Daten konnten nicht geladen werden.';
            this.loading = false;
          }
        } catch (e) {
          console.error("Error fetching statistics:", e);
          this.error = 'Fehler beim Abrufen der Daten.';
          this.loading = false;
        }
      },
      renderChart() {
        const ctx = document.getElementById('statisticsChart').getContext('2d');
        // Datenaufbereitung: Annahme, dass statsData ein Objekt mit string-basierten Keys und numerischen Werten ist.
        const labels = Object.keys(this.statsData);
        const dataValues = Object.values(this.statsData);
        
        // Vorhandene Chart-Instanz zerstören, falls vorhanden.
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Statistische Werte',
              data: dataValues,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
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
      this.fetchStatistics();
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .statistics-dashboard {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
    /* GPU-optimierte CSS-Transformations */
    transform: translateZ(0);
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
  .stats-list {
    list-style: none;
    padding: 0;
  }
  .stats-list li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease;
  }
  .stats-list li:hover {
    background-color: #333;
    transform: scale(1.02); /* GPU-optimiert */
  }
  </style>