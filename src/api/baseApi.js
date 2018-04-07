import encrypt from '@/common/js/encrypt'
import {requestGet, requestPost} from '@/common/js/request'
import config from '@/config/config'

const IP = config.serverIP;

export async function getUserInfo(data) {
    let resData;
    await requestGet(config.userInfoUrl, data).then(res => {
        resData = res;
    });
    return resData
}
