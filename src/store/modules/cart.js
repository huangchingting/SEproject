// items: [{ id, quantity }]
const state = () => ({
    items: [],
})

// getters
const getters = {
    cartItems: (state, getters, rootState) => {
        let items = state.items.map(({ id, quantity }) => {
            const product = rootState.product.products.find(product => product.id === id)
            if (product !== undefined) {
                return {
                    id: product.id,
                    img:product.img,
                    title: product.title,
                    price: product.price,
                    stock:  product.stock,
                    quantity
                }
            }
        })

        return items.filter(item => item !== undefined && item !== null)
    },

    cartItemsForTxn: (state, getters, rootState) => {
        let items = state.items.map(({ id, quantity }) => {
            const product = rootState.product.products.find(product => product.id === id)
            if (product !== undefined) {
                return {
                    productId: product.id,
                    amount: quantity
                }
            }
        })

        return items.filter(item => item !== undefined && item !== null)
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartItems.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}

// actions (async)
const actions = {
    addItemToCart({ state, commit, dispatch }, { product, addQuantity }) {
        const { id } = product
        if (product.stock > 0) {
            const cartItem = state.items.find(item => item.id === id)
            if (!cartItem) {
                if (addQuantity > product.stock) {
                    throw new Error('Not enough stock')
                }
                commit('addItemToCart', { id, quantity: addQuantity })
            } else {
                let newQuantity = cartItem.quantity + addQuantity
                dispatch('changeItemQuantity', { id, newQuantity })
            }
        }
    },
    removeAllItems({ state, commit }) {
        state.items.forEach(item => {
            commit('product/decrementProductStock', { id: item.id, quantity: item.quantity }, { root: true })
        })
        commit('setCartItems', { items: [] })
    },
    changeItemQuantity({ state, commit, rootGetters }, { id, newQuantity }) {
        if (newQuantity === 0) {
            commit('removeItemFromCart', { id })
        }

        let product = rootGetters['product/productById'](id)
        let currentQuan = state.items.find(item => item.id === id)?.quantity

        if (currentQuan === undefined || newQuantity <= product.stock) {
            commit('changeItemQuantity', { id, newQuantity })
        } else {
            throw new Error('Not enough stock')
        }
    }
}

// mutations
const mutations = {
    addItemToCart(state, { id, quantity }) {
        state.items.push({ id, quantity })
    },
    removeItemFromCart(state, { id }) {
        state.items = state.items.filter(item => item.id !== id)
    },
    changeItemQuantity(state, { id , newQuantity }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity = newQuantity
    },
    setCartItems(state, { items }) {
        state.items = items
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}