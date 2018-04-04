<template>
    <div class="post-topic" v-if="isLogin">
        <nuxt-link class="btn" to="/topic/create">发布话题</nuxt-link>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'topicCreatePanel',
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        }
    }
</script>

<style lang="stylus" scoped>
    .post-topic
        background-color #ffffff
        padding 10px
        margin-bottom 13px
        .btn
            display inline-block
            border-radius 3px
            background-color #80bd01
            padding 3px 10px
            font-size 14px
            color #ffffff
            line-height 2em
            transition all 0.2s ease-in-out
            &:hover
                background-color #6ba44e
</style>
