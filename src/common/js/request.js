import axios from 'axios'

import {getOptions} from './options';

import {getType, deepMerge} from '@/common/js/util'

export async function requestGet(url, data, config) {
    return new Promise((resolve, reject) => {
        axios.get(url, deepMerge({
            params: data,
            withCredentials: true
        }, config)).then(res => {
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
export async function requestPost(url, data, config) {
    let mergeConfig = deepMerge(config, {
        withCredentials: true
    })
    return new Promise((resolve, reject) => {
        let options = getOptions()
        axios.post(url, data, mergeConfig).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
