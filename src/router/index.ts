import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/works/guess_numbers',
      name: 'guess_numbers',
      component: () => import('../works/GuessNumbers/index.vue'),
    },
    {
      path: '/works/schult_table',
      name: 'schult_table',
      component: () => import('../works/SchultTable/index.vue'),
    },
    {
      path: '/works/calendar_puzzle',
      name: 'calendar_puzzle',
      component: () => import('../works/CalendarPuzzle/index.vue'),
    },
  ],
});

export default router;
