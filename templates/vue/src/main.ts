import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
  name: 'MyApp',
  router,
  render: (h) => h(App)
}).$mount('#app')
