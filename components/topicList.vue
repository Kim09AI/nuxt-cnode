<template>
    <div class="topic-list" v-if="topicList.length > 0">
        <div class="item" v-for="item in topicList" :key="item.id">
            <nuxt-link :to="`/user/${item.author.loginname}`">
                <img class="avatar" :src="item.author.avatar_url">
            </nuxt-link>
            <div class="reply" v-if="item.reply_count !== undefined">
                <span class="reply-count">{{ item.reply_count }}/</span>
                <span class="visit-count">{{ item.visit_count }}</span>
            </div>
            <span v-if="item.tab" class="tab" :class="{ green: item.top || item.good }">{{ tabFormat(item.tab, item.top, item.good) }}</span>
            <nuxt-link class="title" :to="`/topic/${item.id}`">{{ item.title }}</nuxt-link>
            <span class="last-active-time">{{ item.last_reply_at | timeFormatFilter }}</span>
        </div>
    </div>
</template>

<script>
    import { tabFormatMixin } from '~/mixins'

    export default {
        name: 'topicList',
        mixins: [tabFormatMixin],
        props: {
            topicList: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .topic-list
        background-color #ffffff
        .item
            padding 0 10px
            border-bottom 1px solid #f0f0f0
            display flex
            align-items center
            height 50px
            box-sizing border-box
            &:last-child
                border-bottom none
            .avatar
                width 30px
                height 30px
                border-radius 3px
                display block
            .reply
                width 70px
                text-align center
                .reply-count
                    color #9e78c0
                    font-size 14px
                .visit-count
                    font-size 12px
                    color #b4b4b4
            .tab
                font-size 12px
                color #999999
                padding 3px 4px
                border-radius 3px
                background-color #e5e5e5
                &.green
                    background-color #80bd01
                    color #ffffff
            .title
                color #333333
                font-size 16px
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                flex 1
                margin-left 5px
                line-height 20px
                &:hover
                    text-decoration underline
            .last-active-time
                font-size 12px
                color #778087
                margin-left 10px
</style>
