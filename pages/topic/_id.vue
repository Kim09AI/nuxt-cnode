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
                        <span>发布于&nbsp;{{ topic.create_at | timeFormatFilter }}</span>
                        <span>作者&nbsp;{{ topic.author.loginname }}</span>
                        <span>{{ topic.visit_count }}&nbsp;次浏览</span>
                        <span>来自 {{ tabFormat(topic.tab) }}</span>
                    </div>
                </div>
                <div class="markdown markdown-body" v-html="topic.content"></div>
            </div>
            <comment-list v-if="topic.replies.length > 0" :list="topic.replies"/>
            <div class="placeholder">
                <!-- 占位 -->
            </div>
            <markdown v-if="isLogin" title="添加回复" @commitValue="reply" ref="markdown"/>
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
    import { getTopicById, getUserDetail, createReplies } from '~/api/index'
    import { tabFormatMixin } from '~/mixins'

    // 获取回复评论基础结构
    const getReplie = ({ avatar_url, loginname, content, id, is_uped }) => ({
        author: {
            avatar_url,
            loginname
        },
        content,
        create_at: new Date().toString(),
        id,
        is_uped,
        reply_id: '',
        ups: []
    })

    export default {
        name: 'topic',
        mixins: [tabFormatMixin],
        async asyncData({ params }) {
            try {
                let id = params.id
                let topic = await getTopicById(id)
                let topicUser = await getUserDetail(topic.data.author.loginname)
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
                topicUser: {}
            }
        },
        methods: {
            reply(value) {
                if (!value) {
                    this.$Alert.show('评论内容不能为空')
                    return
                }
                this._createReplies(value)
            },
            async _createReplies(value) {
                try {
                    let res = await createReplies(this.topic.id, value)
                    if (res.success) {
                        let markdown = this.$refs.markdown.getMarkdown()
                        this.$refs.markdown.clear()

                        this.addReplies(markdown, res.reply_id)
                        this.$Alert.show('评论成功')
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            addReplies(markdown, id) {
                const data = {
                    content: markdown,
                    id,
                    avatar_url: this.user.avatar_url,
                    loginname: this.user.loginname,
                    is_uped: this.topic.author_id === this.user.id
                }

                let replie = getReplie(data)
                this.topic.reply_count++
                this.topic.replies.unshift(replie)
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
                span:before
                    content: ' • '
        .markdown
            padding 10px 20px
            border-top 1px solid #e5e5e5
    .placeholder
            height 15px
            background-color #e1e1e1
</style>
