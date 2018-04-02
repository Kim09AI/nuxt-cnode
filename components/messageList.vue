<template>
    <div>
        <div class="item" v-for="(item, index) in list" :key="index">
            <nuxt-link class="link" :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</nuxt-link>
            <span>&nbsp;回复了你的话题&nbsp;</span>
            <nuxt-link class="link" :to="`/topic/${item.topic.id}`">{{ item.topic.title }}</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'messageList',
        props: {
            list: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .item
        font-size 14px
        color #333
        border-bottom 1px solid #f0f0f0
        padding 10px
        &:last-child
            border-bottom none
    .link
        color #08c
        &:hover
            text-decoration underline
            color #005580
</style>
