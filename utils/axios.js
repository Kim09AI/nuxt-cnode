import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, err => Promise.reject(err))

// 响应拦截器
axios.interceptors.response.use(response => {
    return response && response.data
}, err => Promise.reject(err))

export default axios
