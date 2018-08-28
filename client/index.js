import Vue from 'vue'
import app from './app.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import './assets/style/global.styl'
import CreateStore from './store'
import CreateRouter from './route'
Vue.use(Vuex)
Vue.use(Router)

const router = CreateRouter()
const store = CreateStore()

new Vue({
  render: (h) => h(app),
  store,
  router
}).$mount('#root')
