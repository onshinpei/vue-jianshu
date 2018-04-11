import encrypt from '@/common/js/encrypt'
import {requestPost, requestGet} from '@/common/js/request'
import config from '@/config/config'

const IP = config.serverIP;
export function apiLogin({phone, pwd}) {
    const url = '/users/loginuser'
    // pwd = encrypt(pwd)    //加密登录
    return requestPost(IP + url, {phone, pwd});
}
export function aipLogout() {
    const url = '/users/logoutuser';
    return requestGet(IP + url)
}
