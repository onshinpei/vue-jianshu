import encrypt from '@/common/js/encrypt'
import {requestPost} from '@/common/js/request'
import config from '@/config/config'

const IP = config.serverIP;
export function apiLogin({phone, pwd}) {
    const url = '/users/loginuser'
    // pwd = encrypt(pwd)    //加密登录
    return requestPost(IP + url, {phone, pwd});
}
