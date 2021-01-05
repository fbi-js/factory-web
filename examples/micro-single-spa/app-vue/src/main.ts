import { setPublicPath } from 'systemjs-webpack-interop'
import singleSpaVue from 'single-spa-vue'
import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.css'

Vue.config.productionTip = false

// eslint-disable-next-line no-undef
const microApp = require('../micro.config')
setPublicPath(microApp.name)

const lifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: microApp.containerId,
    name: microApp.name,
    router,
    render(h: any) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        }
      })
    }
  }
})

export const { bootstrap, mount, unmount } = lifecycles
