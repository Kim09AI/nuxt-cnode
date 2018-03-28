import axios from '../utils/axios'

// 获取主题列表
export const getTopics = (page = 1, tab = 'all', limit = 40, mdrender = 'false') => {
    return axios.get('/topics', {
        params: {
            page,
            tab,
            limit,
            mdrender
        }
    })
}

// 获取主题详情
export const getTopicById = (id, mdrender = true) => {
    return axios.get(`/topic/${id}`, {
        params: {
            mdrender
        }
    })
}

// 获取用户详情
export const getUserDetail = (loginname) => {
    return axios.get(`/user/${loginname}`)
}

// 验证accesstoken
export const checkAccesstoken = (accesstoken) => {
    return axios.post('/accesstoken', {
        accesstoken
    })
}

// 创建主题
export const createTopic = (title, content) => {
    return axios.post('/topics', {
        title,
        content,
        tab: 'dev'
    })
}

// 评论
export const createReplies = (topicId, content, reply_id) => {
    return axios.post(`/topic/${topicId}/replies`, {
        content,
        reply_id
    })
}
