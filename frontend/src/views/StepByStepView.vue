<!-- Datei: frontend/src/views/StepByStepView.vue -->
<template>
    <div class="step-by-step">
      <h1>Step-by-Step Visualisierung</h1>
      <ProgressBar :completedTasks="completedTasks" :totalTasks="totalTasks" />
      <Timeline :steps="steps" />
      <TaskList :tasks="tasks" />
    </div>
  </template>
  
  <script>
  import ProgressBar from '../components/ProgressBar.vue';
  import Timeline from '../components/Timeline.vue';
  import TaskList from '../components/TaskList.vue';
  
  export default {
    name: 'StepByStepView',
    components: {
      ProgressBar,
      Timeline,
      TaskList
    },
    data() {
      return {
        // Beispielhafte Daten – in einer realen Anwendung werden diese vom Backend geladen.
        completedTasks: 2,
        totalTasks: 5,
        steps: [
          { id: '1', name: 'Finanzierung klären' },
          { id: '2', name: 'Objektsuche' },
          { id: '3', name: 'Notartermin' }
        ],
        tasks: [
          { id: 'a', titel: 'Bankunterlagen einreichen', beschreibung: 'Unterlagen für die Bank vorbereiten', status: 'OFFEN' },
          { id: 'b', titel: 'Besichtigung organisieren', beschreibung: 'Termin mit Makler vereinbaren', status: 'IN_BEARBEITUNG' },
          { id: 'c', titel: 'Vertragsentwurf prüfen', beschreibung: 'Rechtsberatung einholen', status: 'ABGESCHLOSSEN' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .step-by-step {
    padding: 20px;
    background-color: #1a1a1a;
    color: #fff;
  }
  </style>
  