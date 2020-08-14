import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router';

Vue.use(Router);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "index" */ '@/views/index/main.vue'),
      meta: {
        title: 'utools-tmpl-web-首页',
      },
    },
  ],
});

export default router;
