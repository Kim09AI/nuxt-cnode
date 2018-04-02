<template>
    <main-layout v-if="topic.title">
        <div slot="content">
            <div class="topic-content">
                <div class="header">
                    <div class="title-wrapper">
                        <span class="tab" v-if="topic.top || topic.good" :class="{ green: topic.top || topic.good }">{{ tabFormat(null, topic.top, topic.good) }}</span>
                        <h3 class="title">{{ topic.title }}</h3>
                    </div>
                    <div class="info">
                        <div class="left">
                            <span>发布于&nbsp;{{ topic.create_at | timeFormatFilter }}</span>
                            <span>作者&nbsp;{{ topic.author.loginname }}</span>
                            <span>{{ topic.visit_count }}&nbsp;次浏览</span>
                            <span>来自 {{ tabFormat(topic.tab) }}</span>
                        </div>
                        <span class="collection" :class="{ active: topic.is_collect }" v-if="isLogin" @click="collection">{{ topic.is_collect ? '取消收藏' : '收藏' }}</span>
                    </div>
                    <div class="editer" v-if="topic.author_id === user.id">
                        <i class="iconfont icon" @click="edit">&#xe603;</i>
                        <i class="iconfont icon">&#xe60d;</i>
                    </div>
                </div>
                <div class="markdown markdown-body" v-html="topic.content"></div>
            </div>
            <comment-list
                v-if="topic.replies.length > 0"
                :list="topic.replies"
                :replyCompleteCommentId="replyCompleteCommentId"
                @onLikeClick="commentLike"
                @commitValue="commentReply"
            />
            <div class="placeholder">
                <!-- 占位 -->
            </div>
            <markdown
                v-if="isLogin"
                :isCommit="isCommit"
                title="添加回复"
                commitText="回复"
                activeText="回复中..."
                @commitValue="reply"
                ref="markdown"
            />
        </div>
        <div slot="slidebar">
            <user-info-panel title="作者" :user="topicUser"/>
        </div>
    </main-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import commentList from '~/components/commentList'
    import userInfoPanel from '~/components/userInfoPanel'
    import markdown from '~/components/markdown'
    import { getTopicById, getUserDetail, topicCollect, createReplies, replyLike } from '~/api/index'
    import { tabFormatMixin } from '~/mixins'

    // 根据评论结构创建一条评论
    const getReplie = ({ avatar_url, loginname, content, id, is_uped, isAuthor }) => ({
        author: {
            avatar_url,
            loginname
        },
        content,
        create_at: new Date().toString(),
        id,
        is_uped: false,
        reply_id: '',
        ups: [],
        isAuthor
    })

    export default {
        name: 'topic',
        mixins: [tabFormatMixin],
        async asyncData({ params }) {
            try {
                let id = params.id
                let topic = await getTopicById(id)
                let topicUser = await getUserDetail(topic.data.author.loginname)

                // 判断评论的用户是否是作者
                let loginname = topic.data.author.loginname
                topic.data.replies.forEach(reply => {
                    if (reply.author.loginname === loginname) {
                        reply.isAuthor = true
                    }
                })

                return {
                    topic: topic.data,
                    topicUser: topicUser.data
                }
            } catch (e) {
                console.log('fail in topic detail', e.message)
            }
        },
        head() {
            let title = this.topic && this.topic.title || ''
            return {
                title: `${title} - CNode技术社区`
            }
        },
        data() {
            return {
                topic: {},
                topicUser: {},
                isCommit: false, // 是否正在回复评论
                replyCompleteCommentId: '', // 回复评论成功时，评论的id，如：回复的是第一条评论，id为第一条评论的id
            }
        },
        methods: {
            async reply(value) {
                if (!value) {
                    this.$Alert.show('评论内容不能为空')
                    return
                }

                this.isCommit = true

                await this.createReplies(value)

                this.isCommit = false
            },
            async createReplies(value) { // 创建文章的评论
                try {
                    let res = await createReplies(this.topic.id, value)
                    if (res.success) {
                        let markdown = this.$refs.markdown.getMarkdown()
                        this.$refs.markdown.clear()

                        this.addReplies(markdown, res.reply_id)
                        this.$Alert.show('评论成功')
                    } else {
                        this.$Alert.show(res.error_msg)
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            async commentReply(value, markdown, index) {
                if (!value) {
                    this.$Alert.show('评论内容不能为空')
                    return
                }

                let reply = this.topic.replies[index]
                this.$set(reply, 'isCommit', true)

                // 把@loginname 替换成链接
                markdown = markdown.replace(`@${reply.author.loginname}`, `<a href="/user/${reply.author.loginname}">@${reply.author.loginname}</a>`)

                await this.createCommentReply(value, reply.id, markdown)

                reply.isCommit = false
            },
            async createCommentReply(value, replyId, markdown) { // 创建评论的评论
                try {
                    let res = await createReplies(this.topic.id, value, replyId)

                    if (res.success) {
                        this.addReplies(markdown, res.reply_id)
                        this.$Alert.show('评论成功')
                    } else {
                        this.$Alert.show(res.error_msg)
                    }

                    this.replyCompleteCommentId = replyId
                } catch (e) {
                    console.log(e)
                }
            },
            addReplies(markdown, id) {
                const data = {
                    content: `<div class="markdown-text">${markdown}</div>`,
                    id,
                    avatar_url: this.user.avatar_url,
                    loginname: this.user.loginname,
                    isAuthor: this.topic.author_id === this.user.id
                }

                let replie = getReplie(data)
                this.topic.reply_count++
                this.topic.replies.push(replie)
            },
            async collection() {
                try {
                    let { id, is_collect } = this.topic
                    let res = await topicCollect(id, !is_collect)
                    if (res.success) {
                        this.topic.is_collect = !is_collect
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            edit() {
                this.$router.push(`/topic/${this.topic.id}/edit`)
            },
            async commentLike(index) {
                if (!this.isLogin) {
                    this.$Alert.show('请先登录')
                    return
                }

                let reply = this.topic.replies[index]

                if (reply.author.loginname === this.user.loginname) {
                    this.$Alert.show('呵呵，不能帮自己点赞。')
                    return
                }

                try {
                    let id = reply.id
                    let res = await replyLike(id)
                    if (res.success) {
                        if (res.action === 'up') {
                            reply.ups.push(this.user.id)
                        } else {
                            let i = reply.ups.indexOf(this.user.id)
                            reply.ups.splice(i, 1)
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },
        computed: {
            ...mapGetters([
                'isLogin',
                'user'
            ])
        },
        components: {
            commentList,
            userInfoPanel,
            markdown
        }
    }
</script>

<style lang="stylus" scoped>
    @import 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
    .topic-content
        background-color #ffffff
        .header
            padding 10px
            border-radius 3px 3px 0 0
            .title-wrapper
                margin 8px 0
                .title
                    font-size 22px
                    font-weight bold
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                    line-height 130%
                    display inline-block
                .tab
                    font-size 12px
                    color #999999
                    padding 3px 4px
                    border-radius 3px
                    background-color #e5e5e5
                    position relative
                    top -6px
                    display inline-block
                    margin-right 7px
                    font-weight bold
                    &.green
                        background-color #80bd01
                        color #ffffff
            .info
                font-size 12px
                color #838383
                line-height 20px
                display flex
                justify-content space-between
                .left
                    span:before
                        content: ' • '
                .collection
                    font-size 14px
                    color #ffffff
                    background-color #80bd01
                    border-radius 3px
                    padding 7px 12px
                    transition all 0.2s ease-in-out
                    cursor pointer
                    &:hover
                        background-color #6ba44e
                    &.active
                        background-color #e5e5e5
                        color #000000
                        &:hover
                            background-color #909090
                            color #ffffff
            .editer
                .icon
                    color #999
                    font-size 18px
                    cursor pointer
                .icon + .icon
                    margin-left 10px
        .markdown
            padding 10px 20px
            border-top 1px solid #e5e5e5
    .placeholder
            height 15px
            background-color #e1e1e1
</style>
