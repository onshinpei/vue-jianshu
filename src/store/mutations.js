import * as types from './mutation-types'
import {deepMerge} from '../common/js/util';

export const state = {
    'loginStatus': JSON.parse(localStorage.getItem('loginStatus') || '{}'),
    'userInfo': JSON.parse(localStorage.getItem('userInfo') || '{}')
}

// mutations
export const mutations = {
    // 登录
    [types.SET_LOGIN](state, {loginStatus, userInfo}) {
        state.loginStatus = loginStatus || {};
        state.userInfo = userInfo || {};

        localStorage.setItem('loginStatus', JSON.stringify(state.loginStatus));
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 登出
    [types.LOGOUT](state) {
        clear(state);
    },
    [types.SET_USER_INFO](state, obj) {
        state.userInfo = deepMerge(state.userInfo, obj);
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
}

function clear(state) {
    state.loginStatus = {};
    state.userInfo = {};

    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userInfo');
}
