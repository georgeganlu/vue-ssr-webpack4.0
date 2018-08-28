import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import state from './state'

export default () => {
  return new Vuex.Store({
    state,
    getters,
    mutations
  })
}
