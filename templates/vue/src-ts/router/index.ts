import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
      meta: { title: 'Home' }
    }
  ]
})
