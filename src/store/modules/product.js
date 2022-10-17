import * as productSvc from '@/services/product.service'

// initial state
const state = () => ({
    products: []
})

// getters
const getters = {
    productById: state => id => {
        return state.products.find(product => product.id === id)
    },
    getProductRec: state => id => {
        if (state.products.length < 4) {
            return state.products.filter(product => product.id !== id)
        }

        const res = []
        for(let i = 0; i < 4;){
            const random = Math.floor(Math.random() * state.products.length)
            if(res.indexOf(state.products[random]) !== -1 || state.products[random].id === id){
                continue
            }
            res.push(state.products[random])
            i++
        }
        return res
    }
}

// actions
const actions = {
    async getAllProducts({ commit }) {
        const products = await productSvc.getProducts()
        commit('setProducts', products)
    }
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.products = products
    },

    decrementProductStock(state, { id, quantity }) {
        const product = state.products.find(product => product.id === id)
        if (product) {
            product.stock -= quantity
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}