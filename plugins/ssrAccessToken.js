import axios from '~/utils/axios'
import { parseCookieByName } from '~/utils'

export default function({ isServer, req }) {
    if (isServer) {
        let accessToken = parseCookieByName(req.headers.cookie, 'access_token')
        // 添加accessToken到axios全局配置，以供做服务端渲染时的其他请求获取
        accessToken && (axios.defaults.accesstoken = accessToken)
    }
}
