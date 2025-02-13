<template>
    <div class="dashboard market-dashboard">
      <h2>Wohnmarkt & Preistrends</h2>
      <div v-if="loading" class="loading">Lade Marktdaten...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="chart-container">
          <!-- Canvas für das Trend-Diagramm -->
          <canvas id="marketChart"></canvas>
        </div>
        <ul class="market-list">
          <li v-for="(value, key) in marketData" :key="key">
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
    name: 'MarketDashboard',
    data() {
      return {
        marketData: {},
        loading: true,
        error: null,
        chartInstance: null,
      };
    },
    methods: {
      async fetchMarketTrends() {
        try {
          const response = await axios.get('/api/extended/market');
          if(response.data.success) {
            this.marketData = response.data.data;
            this.loading = false;
            this.renderChart();
          } else {
            this.error = 'Marktdaten konnten nicht geladen werden.';
            this.loading = false;
          }
        } catch (e) {
          console.error("Error fetching market trends data:", e);
          this.error = 'Fehler beim Abrufen der Marktdaten.';
          this.loading = false;
        }
      },
      renderChart() {
        const ctx = document.getElementById('marketChart').getContext('2d');
        // Annahme: marketData ist ein Objekt, das Preistrends als numerische Werte, 
        // zum Beispiel eine Zeitreihe repräsentiert
        const labels = Object.keys(this.marketData);
        const dataValues = Object.values(this.marketData);
        
        // Vorhandene Chart-Instanz zerstören, falls vorhanden.
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        
        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Preistrends',
              data: dataValues,
              backgroundColor: 'rgba(255, 206, 86, 0.5)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 2,
              fill: true,
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
              y: {
                beginAtZero: true,
              },
            },
          }
        });
      }
    },
    mounted() {
      this.fetchMarketTrends();
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .market-dashboard {
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
  .market-list {
    list-style: none;
    padding: 0;
  }
  .market-list li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease;
  }
  .market-list li:hover {
    background-color: #333;
    transform: scale(1.02); /* GPU-optimiert */
  }
  </style>