import * as types from './mutation-types'
import { getUserDetail, checkAccesstoken } from '~/api'
import { parseCookieByName } from '~/utils'

export const nuxtServerInit = async ({ commit }, { req }) => {
    let accessToken = parseCookieByName(req.headers.cookie, 'access_token')

    if (!!accessToken) {
        try {
            let res = await checkAccesstoken(accessToken)
            if (res.success) {
                let userDetail = await getUserDetail(res.loginname)
                userDetail.data.id = res.id

                // 提交登录状态及用户信息
                commit(types.SET_LOGIN_TYPE, true)
                commit(types.SET_USER_INFO, userDetail.data)
            }
        } catch (e) {
            console.log('fail in nuxtServerInit', e.message)
        }
    }
}
