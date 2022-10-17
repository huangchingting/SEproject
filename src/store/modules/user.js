import * as userSvc from '@/services/user.service'

// initial state
const state = () => ({
    username: null,
    isLogin: false
})

// getters
const getters = {}

// actions
const actions = {
    async getIsLogin({ commit }) {
        const res = await userSvc.userAuth()
        commit('setIsLogin', res.isLogin)
    }
}

// mutation
const mutations = {
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin
        if (!isLogin) {
            state.username = null
        }
    },
    setUsername(state, username) {
        state.username = username
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}