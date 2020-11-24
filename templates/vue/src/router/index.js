import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Home.vue'),
      meta: { title: 'Home' }
    }
  ]
})
