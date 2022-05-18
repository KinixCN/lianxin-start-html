// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import qs from 'qs'
import i18n from './i18n'
import './assets/sass/media.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.$axios = axios
Vue.prototype.axios = axios
Vue.use(qs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
