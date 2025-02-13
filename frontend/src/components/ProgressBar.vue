<!-- Datei: frontend/src/components/ProgressBar.vue -->
<template>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProgressBar',
    props: {
      completedTasks: {
        type: Number,
        required: true
      },
      totalTasks: {
        type: Number,
        required: true
      }
    },
    computed: {
      progressPercentage() {
        return this.totalTasks ? (this.completedTasks / this.totalTasks) * 100 : 0;
      }
    }
  }
  </script>
  
  <style scoped>
  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background-color: #0f0;
    transition: width 0.5s ease-in-out;
  }
  </style>
  