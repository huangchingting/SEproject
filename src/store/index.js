import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import product from './modules/product'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    product,
    user,
  },
  plugins: [createPersistedState({
    paths: ['cart', 'user'],
  })],
})
