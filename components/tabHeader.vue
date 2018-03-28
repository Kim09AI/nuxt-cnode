<template>
    <div class="tab-header">
        <nuxt-link class="link" to="/">主页&nbsp;/&nbsp;&nbsp;</nuxt-link>
        <span>{{ text }}</span>
    </div>
</template>

<script>
    export default {
        name: 'tabHeader',
        props: {
            text: {
                type: String,
                default: '发布话题'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .tab-header
        padding 10px
        border-radius 3px 3px 0 0
        line-height 20px
        color #999
        font-size 14px
        background-color #f6f6f6
        border-bottom 1px solid #e5e5e5
        .link
            color #80bd01
</style>
