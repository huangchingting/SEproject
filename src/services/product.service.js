import * as httpHelper from './../helpers/http.helper'
import logger from "@/helpers/log.helper"

export const getProducts = async() => {
    let url = `/product`
    try {
        return await httpHelper.get(url)

    } catch (err) {
        logger.error(err)
        return []
    }
}

export const createProduct = async(product) => {
    let url = `/product`
    try {
        return await httpHelper.post(url, { ...product })

    } catch (err) {
        logger.error(err)
        return {}
    }
}

export const updateProductById = async(productId, product) => {
    let url = `/product/${productId}`
    try {
        return await httpHelper.put(url, { ...product })

    } catch (err) {
        logger.error(err)
        return {}
    }
}

export const deleteProductById = async(productId) => {
    let url = `/product/${productId}`

    try {
        return await httpHelper.del(url)
    } catch (err) {
        return false
    }
}