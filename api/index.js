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

// 收藏或取消主题
export const topicCollect = (id, collect) => {
    let url = collect ? '/topic_collect/collect' : '/topic_collect/de_collect'
    return axios.post(url, {
        topic_id: id
    })
}

// 获取用户详情
export const getUserDetail = (loginname) => axios.get(`/user/${loginname}`)

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

// 编辑主题
export const topicUpdate = (id, title, content, tab) => {
    return axios.post('/topics/update', {
        topic_id: id,
        title,
        content,
        tab
    })
}

// 评论
export const createReplies = (topicId, content, reply_id) => {
    return axios.post(`/topic/${topicId}/replies`, {
        content,
        reply_id
    })
}

// 点赞
export const replyLike = (reply_id) => axios.post(`/reply/${reply_id}/ups`)
