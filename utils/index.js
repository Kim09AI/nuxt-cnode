const timeFormatArr = [0, 60, 3600, 86400, 2592000, 31104000, Number.MAX_VALUE]
const timeUnit = ['刚刚', '分钟前', '小时前', '天前', '月前', '年前']

export function timeFormat(dateStr) {
    // 先toString转成当前时区的时间再getTime
    let dateTime = new Date(new Date(dateStr).toString()).getTime()
    let now = new Date().getTime()
    let time = (now - dateTime) / 1000

    let index = timeFormatArr.findIndex((item, index) => {
        return item <= time && timeFormatArr[index + 1] > time
    })

    if (index === 0) {
        return timeUnit[0]
    }

    time = time / timeFormatArr[index] | 0
    return time + timeUnit[index]
}

export const tabs = {
    share: '分享',
    ask: '问答',
    good: '精华',
    job: '招聘',
    dev: '测试'
}

// 获取accesstoken
export const getAccessToken = (config) => {
    let accesstoken

    if (process.browser) { // 浏览器
        const Cookie = require('js-cookie')
        accesstoken = Cookie.get('access_token')
    } else { // 服务端渲染
        accesstoken = config.accesstoken
    }

    return accesstoken
}

// 解析请求头cookie的指定name值
export const parseCookieByName = (cookie, name) => {
    if (!cookie || !name) return ''

    let pattern = new RegExp(`(?:^|\\s)${name}=([^;]*)(?:;|$)`)
    let matched = cookie.match(pattern) || []
    let value = matched[1] || ''

    return decodeURIComponent(value)
}
