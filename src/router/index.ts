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
      component: () => import('../works/GuessNumbers/GuessNumbersView.vue'),
    },
  ],
});

export default router;
