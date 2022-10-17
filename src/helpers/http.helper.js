import axios from 'axios'

import Log from './log.helper'

const instance = axios.create({
    timeout: 60000,
    maxRedirects: 10,
})

// res interceptors to check if accessToken is changed
instance.interceptors.response.use(function(response) {
    return response.data
}, function(error) {
    // outside 2xx
    return Promise.reject(error.response === undefined ? error : error.response.data)
})

export const get = async(path) => {
    Log.http(`GET ${path}`)
    return await instance.get(`/api${path}`)
}

export const del = async(path) => {
    Log.http(`DELETE ${path}`)
    return await instance.delete(`/api${path}`)
}

export const put = async(path, body) => {
    Log.http(`PUT ${path}`)
    return instance.put(`/api${path}`, body)
}

export const post = async(path, body) => {
    Log.http(`POST ${path}`)
    return instance.post(path === '/logout' ? '/logout' : `/api${path}`, body)
}