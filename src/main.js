import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import store from './store/index'

// Bootstrap para Vue
Vue.use(BootstrapVue)
// Boostratp Icons
Vue.use(IconsPlugin)
//Vuex para gerenciamento de estados

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
