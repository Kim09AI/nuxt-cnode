class Api {
    get() {
        throw new Error('Abstract methods must be implemented')
    }

    post() {
        throw new Error('Abstract methods must be implemented')
    }

    // 获取主题列表
    getTopics(page = 1, tab = 'all', limit = 40, mdrender = 'false') {
        return this.get('/topics', {
            params: {
                page,
                tab,
                limit,
                mdrender
            }
        })
    }

    // 获取主题详情
    getTopicById(id, mdrender = true) {
        return this.get(`/topic/${id}`, {
            params: {
                mdrender
            }
        })
    }

    // 收藏或取消主题
    topicCollect(id, collect) {
        let url = collect ? '/topic_collect/collect' : '/topic_collect/de_collect'
        return this.post(url, {
            topic_id: id
        })
    }

    // 获取用户收藏的主题
    getTopicCollect(loginname) {
        return this.get(`/topic_collect/${loginname}`)
    }

    // 获取用户详情
    getUserDetail(loginname) {
        return this.get(`/user/${loginname}`)
    }

    // 验证accesstoken
    checkAccesstoken(accessToken) {
        return this.post('/accesstoken', {
            accesstoken: accessToken
        })
    }

    // 创建主题
    createTopic(title, content) {
        return this.post('/topics', {
            title,
            content,
            tab: 'dev'
        })
    }

    // 编辑主题
    topicUpdate(id, title, content, tab) {
        return this.post('/topics/update', {
            topic_id: id,
            title,
            content,
            tab
        })
    }

    // 评论
    createReplies(topicId, content, reply_id) {
        return this.post(`/topic/${topicId}/replies`, {
            content,
            reply_id
        })
    }

    // 点赞
    replyLike(reply_id) {
        return this.post(`/reply/${reply_id}/ups`)
    }

    // 获取消息
    getMessages(mdrender = false) {
        return this.get('/messages', {
            params: {
                mdrender
            }
        })
    }

    // 标记全部已读
    messageMarkAll() {
        return this.post('/message/mark_all')
    }
}

export default Api
