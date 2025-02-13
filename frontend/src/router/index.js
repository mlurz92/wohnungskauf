// Datei: wohnungskauf/frontend/src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import StepByStepView from '../views/StepByStepView.vue';
import FinanzierungsView from '../views/FinanzierungsView.vue';
import KontaktView from '../views/KontaktView.vue';
import ObjektvergleichView from '../views/ObjektvergleichView.vue';
import TerminView from '../views/TerminView.vue';
import ProzessBegleitungView from '../views/ProzessBegleitungView.vue';
import ErweiterungenView from '../views/ErweiterungenView.vue';

// Neue Dashboard-Komponenten
import StatisticsDashboard from '../components/StatisticsDashboard.vue';
import TrafficDashboard from '../components/TrafficDashboard.vue';
import NatureDashboard from '../components/NatureDashboard.vue';
import InvestmentDashboard from '../components/InvestmentDashboard.vue';
import MarketDashboard from '../components/MarketDashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/step-by-step', name: 'StepByStepView', component: StepByStepView },
  { path: '/finanzierung', name: 'FinanzierungsView', component: FinanzierungsView },
  { path: '/kontakte', name: 'KontaktView', component: KontaktView },
  { path: '/objektvergleich', name: 'ObjektvergleichView', component: ObjektvergleichView },
  { path: '/termine', name: 'TerminView', component: TerminView },
  { path: '/prozess-begleitung', name: 'ProzessBegleitungView', component: ProzessBegleitungView },
  { path: '/erweiterungen', name: 'ErweiterungenView', component: ErweiterungenView },
  // Neue Dashboard-Routen
  { path: '/dashboard/statistics', name: 'StatisticsDashboard', component: StatisticsDashboard },
  { path: '/dashboard/traffic', name: 'TrafficDashboard', component: TrafficDashboard },
  { path: '/dashboard/nature', name: 'NatureDashboard', component: NatureDashboard },
  { path: '/dashboard/investments', name: 'InvestmentDashboard', component: InvestmentDashboard },
  { path: '/dashboard/market', name: 'MarketDashboard', component: MarketDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;