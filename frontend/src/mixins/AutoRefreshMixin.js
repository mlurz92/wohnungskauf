// Datei: wohnungskauf/frontend/src/mixins/AutoRefreshMixin.js

export default {
    data() {
      return {
        autoRefreshIntervalId: null,
        refreshInterval: 60000 // Aktualisierungsintervall in Millisekunden (z.B. 60 Sekunden)
      };
    },
    methods: {
      /**
       * Diese Methode sollte in der Komponente definiert sein,
       * die den Datenabruf ausführt (z.B. fetchStatistics, fetchTraffic, etc.)
       */
      refreshData() {
        console.warn("Die refreshData Methode muss in der Komponente überschrieben werden.");
      },
      /**
       * Startet den Auto-Refresh Zyklus.
       * Verwendet requestAnimationFrame, um der GPU kontinuierlichen, flüssigen Ablauf zu ermöglichen.
       */
      startAutoRefresh() {
        // Sofortiger Datenabruf beim Start
        this.refreshData();
        // Setzt den wiederholenden Timer
        this.autoRefreshIntervalId = setInterval(() => {
          // Nutzung von requestAnimationFrame zur Optimierung der Rendering-Phase
          requestAnimationFrame(() => {
            this.refreshData();
          });
        }, this.refreshInterval);
      },
      /**
       * Stoppt den Auto-Refresh Zyklus
       */
      stopAutoRefresh() {
        if (this.autoRefreshIntervalId) {
          clearInterval(this.autoRefreshIntervalId);
          this.autoRefreshIntervalId = null;
        }
      }
    },
    mounted() {
      this.startAutoRefresh();
    },
    beforeUnmount() {
      this.stopAutoRefresh();
    }
  };