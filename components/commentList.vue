<template>
    <div class="comment-list-wrapper">
        <div class="header">{{ list.length }}&nbsp;回复</div>
        <ul class="comment-list">
            <li class="item" v-for="(item, index) in list" :key="item.id">
                <nuxt-link :to="`/user/${item.author.loginname}`">
                    <img class="avatar" :src="item.author.avatar_url">
                </nuxt-link>
                <div class="reply-info">
                    <div class="info">
                        <div>
                            <nuxt-link class="author" :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</nuxt-link>
                            <span class="level">{{ index + 1 }}楼•{{ item.create_at | timeFormatFilter }}</span>
                            <span class="reply-by-author" v-if="item.isAuthor">作者</span>
                        </div>
                        <div class="like">
                            <i class="iconfont icon" v-show="item.ups.length > 0" @click="likeClick(index)">&#xe615;</i>
                            <span class="count" v-show="item.ups.length > 0">{{ item.ups.length }}</span>
                            <i class="iconfont reply" @click="replyClick(item.id)">&#xe609;</i>
                        </div>
                    </div>
                    <div class="reply-content markdown-body" v-html="item.content"></div>
                    <markdown
                        :height="markdownHeight"
                        commitText="回复"
                        activeText="回复中..."
                        :initialValue="`@${item.author.loginname} `"
                        :isCommit="item.isCommit"
                        v-if="showMarkdown(item.id)"
                        @commitValue="commitValue(index)"
                        :ref="`markdown${index}`"
                    />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import markdown from '~/components/markdown'

    export default {
        name: 'commentList',
        props: {
            list: {
                type: Array,
                default: () => []
            },
            replyCompleteCommentId: { // 当前回复评论的评论id，回复成功后传入，以隐藏markdown编辑器
                type: String,
                default: ''
            }
        },
        data() {
            return {
                markdownHeight: 100,
                showMarkdownList: [], // 点击显示的markdown列表
            }
        },
        methods: {
            likeClick(index) {
                this.$emit('onLikeClick', index)
            },
            replyClick(id) {
                if (!this.isLogin) {
                    this.$Alert.show('请先登录')
                    return
                }

                this.showMarkdownList.push(id)
            },
            commitValue(index) {
                const currentMarkdown = this.$refs[`markdown${index}`][0]
                let value = currentMarkdown.getValue()
                let markdown = currentMarkdown.getMarkdown()
                this.$emit('commitValue', value, markdown, index)
            },
            showMarkdown(id) {
                if (!this.showMarkdownList.length) return false

                return this.showMarkdownList.indexOf(id) !== -1
            }
        },
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        },
        watch: {
            replyCompleteCommentId(id) {
                let index = this.showMarkdownList.indexOf(id)
                if (index !== -1) {
                    // 隐藏回复成功的markdown编辑器
                    this.showMarkdownList.splice(index, 1)
                }
            }
        },
        components: {
            markdown
        }
    }
</script>

<style lang="stylus" scoped>
    .comment-list-wrapper
        background-color #ffffff
        margin-top 15px
        .header
            background-color #f6f6f6
            border-radius 3px 3px 0 0
            padding 10px
            font-size 14px
            color #444444
            line-height 20px
        .comment-list
            .item:last-child
                border-bottom none
            .item
                display flex
                border-bottom 1px solid #f0f0f0
                padding 10px
                &:hover
                    .icon
                        display inline!important
                .avatar
                    width 30px
                    height 30px
                    border-radius 3px
                    margin-right 10px
                .reply-info
                    flex 1
                    .info
                        font-size 14px
                        margin-bottom 4px
                        display flex
                        justify-content space-between
                        .author
                            color #666666
                            font-weight bold
                            font-size 12px
                        .level
                            color #08c
                            margin-left 5px
                            &:hover
                                text-decoration underline
                        .reply-by-author
                            margin-left 5px
                            background-color #6ba44e
                            padding 2px
                            color #ffffff
                            font-size 12px
                        .like
                            color gray
                            font-size 14px
                            .icon
                                font-size 13px
                                margin-right 3px
                                color gray
                                cursor pointer
                            .reply
                                color #999999
                                margin-left 5px
                                cursor pointer
                .reply-content
                    padding-left 10px
                    word-break break-all
</style>
