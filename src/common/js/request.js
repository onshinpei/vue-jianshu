import axios from 'axios'

import {getType} from '@/common/js/util'

export async function requestGet(url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data,
            withCredentials: true
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装Post请求
 * @param url 请求地址
 * @param data 请求数据
 */
export async function requestPost(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            withCredentials: true
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
