import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/Main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'tabs',
        name: 'tabs',
        component: () => import('../views/tabs/index.vue'),
        children: [
          {
            path: 'tabsModal',
            name: 'tabsModal',
            component: () => import('../views/tabs/tabsModal_preview.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
