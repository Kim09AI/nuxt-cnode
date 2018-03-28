<template>
    <div class="comment-list-wrapper">
        <div class="header">{{ list.length }}&nbsp;回复</div>
        <ul class="comment-list">
            <li class="item" v-for="(item, index) in list" :key="item.id">
                <img class="avatar" :src="item.author.avatar_url">
                <div class="reply-info">
                    <div class="info">
                        <div>
                            <span class="author">{{ item.author.loginname }}</span>
                            <span class="level">{{ index + 1 }}楼•{{ item.create_at | timeFormatFilter }}</span>
                        </div>
                        <div class="like" v-if="item.ups.length > 0">
                            <i class="iconfont icon">&#xe615;</i>
                            <span class="count">{{ item.ups.length }}</span>
                        </div>
                    </div>
                    <div class="reply-content markdown-body" v-html="item.content"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'commentList',
        props: {
            list: {
                type: Array,
                default: () => []
            }
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
                            margin-right 5px
                        .level
                            color #08c
                            &:hover
                                text-decoration underline
                        .like
                            color gray
                            font-size 15px
                            .icon
                                font-size 13px
                                margin-right 3px
                                color gray
                .reply-content
                    padding-left 10px
</style>
