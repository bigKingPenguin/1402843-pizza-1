import {createRouter, createWebHistory} from 'vue-router';
import {store} from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/PizzaBuilder.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: async (to, from, next) => {
      if (store.state.user.user?.id) {
        next();
      } else {
        await next({
          name: 'main',
        });
        store.commit('common/toggleLoginModal', true);
      }
    },
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
