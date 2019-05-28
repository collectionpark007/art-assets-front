import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/index.vue';
import Dashboard from './views/Dashboard/index.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard/index'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout,
      children: [
        {
          path: 'index',
          component: Dashboard
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: Layout,
      meta
      children: [
        {
          path: 'a',
          component: () => import('./views/About/a.vue')
        }
      ]
    }
  ]
})
