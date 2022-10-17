import * as httpHelper from '@/helpers/http.helper'
import logger from '@/helpers/log.helper'
import store from '@/store'

export const getTxnById = async(txnId) => {
    let url = `/transaction/${txnId}`
    try {
        return await httpHelper.get(url)

    } catch (err) {
        logger.error(err)
        return {}
    }
}

export const createTxn = async() => {
    let url = `/transaction`
    try {
        let cartItems = store.getters['cart/cartItemsForTxn']
        let txn = {
            status: 'created',
            products: cartItems,
        }
        return await httpHelper.post(url, txn)
    } catch (err) {
        logger.error(err)
        throw Error('Fail to create transaction')
    }
}

export const updateTxnById = async(txnId, status) => {
    let url = `/transaction/${txnId}`
    try {
        return await httpHelper.put(url, { status })
    } catch (err) {
        logger.error(err)
        return {}
    }
}
