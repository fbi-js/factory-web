// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import './assets/css/main.css'

// Vue.config.productionTip = false

// new Vue({
//   name: 'MyApp',
//   router,
//   render: (h) => h(App),
// }).$mount('#app')

import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import router from './router'
import './assets/css/main.css'

import App from './App.vue';

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    name:'@project-name/app-vue',
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
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
