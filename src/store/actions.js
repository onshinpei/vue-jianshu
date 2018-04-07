import * as types from './mutation-types'

//登录
export const setLogin = ({commit}, data) => {
    commit(types.SET_LOGIN, data)
}
