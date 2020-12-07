import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/app-demo',
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue'),
      meta: { title: 'Home' },
    },
  ],
})
