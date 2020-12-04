<%_ if (project.isMicro) { _%>
import { setPublicPath } from 'systemjs-webpack-interop'
import singleSpaVue from 'single-spa-vue'
<%_ } _%>
import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.css'

Vue.config.productionTip = false

<%_ if (project.isMicro) { _%>
// eslint-disable-next-line no-undef
const microApp = require('../micro-app.js')
const appName = `@${microApp.orgName}/${microApp.projectName}`
setPublicPath(appName)

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#app-container',
    name: appName,
    router,
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      })
    },
  },
})
export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
<%_ } else { _%>
new Vue({
  name: 'MyApp',
  router,
  render: (h) => h(App),
}).$mount('#app')
<%_ } _%>
