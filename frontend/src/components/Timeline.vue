<!-- Datei: frontend/src/components/Timeline.vue -->
<template>
    <div class="timeline">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="timeline-step"
      >
        <div class="step-index">{{ index + 1 }}</div>
        <div class="step-name">{{ step.name }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Timeline',
    props: {
      steps: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .timeline {
    display: flex;
    overflow-x: auto;
    padding: 10px;
  }
  .timeline-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    transition: transform 0.3s ease;
  }
  .timeline-step:hover {
    transform: scale(1.1);
  }
  .step-index {
    background-color: #444;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  .step-name {
    color: #fff;
    font-size: 14px;
  }
  </style>
  