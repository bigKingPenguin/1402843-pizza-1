import {createRouter, createWebHistory} from 'vue-router';
import {store} from '@/store/store';
import {computed} from 'vue';
import {getStorageData} from '@/plugins/localStorage.service';
import {TOKEN} from '@/common/const/constants';
import {getUserData} from '@/services/user.service';

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

router.beforeEach(async (to) => {

    const user = computed(() => store.state.user.user);

    if (!user.value) {
      if (getStorageData(TOKEN)) await getUserData();
    }
    if (to.name === 'profile') {
      if (user.value) {
        return true;
      } else {
        store.commit('common/toggleLoginModal', true);
        return {
          name: 'main',
        };
      }
    }
  },
);

export default router;
