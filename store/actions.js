import * as types from './mutation-types'
import { parseCookieByName } from '~/utils'

export const nuxtServerInit = async ({ commit, dispatch, state }, { req }) => {
    let accessToken = parseCookieByName(req.headers.cookie, 'access_token')

    if (!!accessToken) {
        try {
            let res = await state.$axios.checkAccesstoken(accessToken)

            if (res.success) {
                let userDetail = await state.$axios.getUserDetail(res.loginname)
                userDetail.data.id = res.id

                // 提交登录状态及用户信息
                dispatch('setUserInfo', {
                    loginState: true,
                    user: userDetail.data,
                    accessToken: accessToken
                })
            }
        } catch (e) {
            console.log('fail in nuxtServerInit', e.message)
        }
    }
}

export const setUserInfo = ({ commit }, { loginState, user, accessToken }) => {
    commit(types.SET_LOGIN_STATE, loginState)
    commit(types.SET_USER_INFO, user)
    commit(types.SET_ACCESS_TOKEN, accessToken)
}
