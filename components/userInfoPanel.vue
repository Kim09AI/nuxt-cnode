<template>
    <panel :title="title">
        <div class="author-info" slot="content">
            <div class="author">
                <nuxt-link :to="`/user/${user.loginname}`">
                    <img class="avatar" :src="user.avatar_url">
                </nuxt-link>
                <nuxt-link class="name" :to="`/user/${user.loginname}`">{{ user.loginname }}</nuxt-link>
            </div>
            <div class="score">积分:&nbsp;{{ user.score }}</div>
        </div>
    </panel>
</template>

<script>
    export default {
        name: 'userInfoPanel',
        props: {
            title: String,
            user: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .author-info
        .author
            display flex
            align-items center
            .avatar
                width 48px
                height 48px
            .name
                font-size 16px
                color #778087
                margin-left 10px
        .score
            font-size 14px
            color #333333
            margin-top 15px
</style>
