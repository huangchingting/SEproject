import * as httpHelper from './../helpers/http.helper'
import logger from "@/helpers/log.helper"

export const userLogin = async(username, password) => {
    let url = `/user/login`
    try {
        return await httpHelper.post(url, { username, password })

    } catch (err) {
        logger.error(err)
        // TODO: redirect to 403
    }
}

export const userAuth = async() => {
    let url = '/user/authentication'
    try {
        return await httpHelper.get(url)
    } catch (err) {
        logger.error(err)
    }
}