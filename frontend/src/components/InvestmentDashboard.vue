<template>
    <div class="dashboard investment-dashboard">
      <h2>Investitions- und Infrastrukturprojekte</h2>
      <div v-if="loading" class="loading">Lade Investitionsdaten...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="chart-container">
          <!-- Canvas für das Investitions-Diagramm -->
          <canvas id="investmentChart"></canvas>
        </div>
        <ul class="investment-list">
          <li v-for="(value, key) in investmentData" :key="key">
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
    name: 'InvestmentDashboard',
    data() {
      return {
        investmentData: {},
        loading: true,
        error: null,
        chartInstance: null,
      };
    },
    methods: {
      async fetchInvestments() {
        try {
          const response = await axios.get('/api/extended/investments');
          if (response.data.success) {
            this.investmentData = response.data.data;
            this.loading = false;
            this.renderChart();
          } else {
            this.error = 'Investitionsdaten konnten nicht geladen werden.';
            this.loading = false;
          }
        } catch (e) {
          console.error("Error fetching investment data:", e);
          this.error = 'Fehler beim Abrufen der Investitionsdaten.';
          this.loading = false;
        }
      },
      renderChart() {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        // Annahme: investmentData ist ein Objekt mit stringbasierten Keys und numerischen Werten.
        // Je nach Datenstruktur kann hier ein horizontales Balkendiagramm gewählt werden.
        const labels = Object.keys(this.investmentData);
        const dataValues = Object.values(this.investmentData);
        
        // Vorhandene Chart-Instanz zerstören, falls vorhanden.
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Investitionsvolumen (€)',
              data: dataValues,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }]
          },
          options: {
            indexAxis: 'y', // horizontales Balkendiagramm
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: 'easeOutQuart'
            },
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }
        });
      }
    },
    mounted() {
      this.fetchInvestments();
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .investment-dashboard {
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
  .investment-list {
    list-style: none;
    padding: 0;
  }
  .investment-list li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease;
  }
  .investment-list li:hover {
    background-color: #333;
    transform: scale(1.02); /* GPU-optimiert */
  }
  </style>