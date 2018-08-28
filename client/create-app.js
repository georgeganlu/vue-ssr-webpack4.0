import Vue from 'vue'
import home from './app.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import './assets/style/global.styl'
import CreateStore from './store'
import CreateRouter from './route'
Vue.use(Vuex)
Vue.use(Router)

export default () => {
  const router = CreateRouter()
  const store = CreateStore()
  const app = new Vue({
    store,
    router,
    render: (h) => h(home)
  })

  return {app, router, store}
}
