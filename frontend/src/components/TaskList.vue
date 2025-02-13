<!-- Datei: frontend/src/components/TaskList.vue -->
<template>
    <div class="task-list">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        :class="task.status.toLowerCase()"
      >
        <h4>{{ task.titel }}</h4>
        <p>{{ task.beschreibung }}</p>
        <small>Status: {{ task.status }}</small>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskList',
    props: {
      tasks: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .task-item {
    padding: 10px;
    background-color: #222;
    border-radius: 5px;
    transition: transform 0.3s ease;
  }
  .task-item:hover {
    transform: scale(1.02);
  }
  .task-item.offen {
    border-left: 5px solid #f39c12;
  }
  .task-item.in_bearbeitung {
    border-left: 5px solid #3498db;
  }
  .task-item.abgeschlossen {
    border-left: 5px solid #2ecc71;
  }
  </style>
  