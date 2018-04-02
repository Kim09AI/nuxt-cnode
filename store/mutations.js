import * as types from './mutation-types'

const mutations = {
    [types.SET_LOGIN_STATE](state, loginState = false) {
        state.isLogin = loginState
    },
    [types.SET_USER_INFO](state, user = {}) {
        state.user = user
    }
}

export default mutations
