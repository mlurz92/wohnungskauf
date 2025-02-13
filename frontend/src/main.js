// Datei: wohnungskauf/frontend/src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import der globalen GPU-Optimierungs-CSS-Datei
import './assets/globalGPU.css';

const app = createApp(App);
app.use(router);
app.mount('#app');