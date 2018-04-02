<template>
    <main-layout>
        <div slot="content">
            <tab-header/>
            <div class="user-info-wrapper">
                <div class="author">
                    <img class="avatar" :src="userDetail.avatar_url">
                    <span class="name">{{ userDetail.loginname }}</span>
                </div>
                <div class="score">{{ userDetail.score }}&nbsp;积分</div>
                <div class="github-wrapper">
                    <i class="iconfont icon">&#xe6a4;</i>
                    <a class="github" :href="`https://github.com/${userDetail.loginname}`" target="_blank">@{{ userDetail.loginname }}</a>
                </div>
                <div class="time">注册时间&nbsp;{{ userDetail.create_at | timeFormatFilter}}</div>
            </div>
            <div class="topic-list-wrapper">
                <div class="title">最近创建的话题</div>
                <topic-list :topicList="userDetail.recent_topics"/>
                <div class="more">
                    <nuxt-link to="/">查看更多»</nuxt-link>
                </div>
            </div>
            <div class="topic-list-wrapper">
                <div class="title">最近参与的话题</div>
                <topic-list :topicList="userDetail.recent_replies"/>
                <div class="more">
                    <nuxt-link to="/">查看更多»</nuxt-link>
                </div>
            </div>
        </div>
        <div slot="slidebar">
            <user-info-panel title="个人信息" :user="userDetail"/>
            <topic-create-panel/>
            <client-panel/>
        </div>
    </main-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import userInfoPanel from '~/components/userInfoPanel'
    import topicCreatePanel from '~/components/topicCreatePanel'
    import clientPanel from '~/components/clientPanel'
    import tabHeader from '~/components/tabHeader'
    import topicList from '~/components/topicList'
    import { getUserDetail } from '~/api'

    export default {
        name: 'userInfo',
        middleware: 'auth',
        head() {
            let loginname = this.userDetail.loginname

            return {
                title: `@${loginname} - CNode：Node.js专业中文社区`
            }
        },
        async asyncData({ params }) {
            let loginname = params.id

            try {
                let res = await getUserDetail(loginname)

                if (res.success) {
                    return {
                        userDetail: res.data
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        components: {
            userInfoPanel,
            topicCreatePanel,
            clientPanel,
            tabHeader,
            topicList
        }
    }
</script>

<style lang="stylus" scoped>
    .user-info-wrapper
        padding 10px
        background-color #ffffff
        .author
            display flex
            align-items center
            .avatar
                width 40px
                height 40px
            .name
                font-size 14px
                color #778087
                margin-left 10px
        .score
            font-size 14px
            color #333333
            margin-top 15px
        .github-wrapper
            margin-top 15px
            display flex
            align-items center
            .icon
                color #cccccc
                font-size 18px
                &:hover
                    color #999999
            .github
                margin-left 10px
                font-size 14px
        .time
            color #ababab
            font-size 14px
            margin-top 15px
    .topic-list-wrapper
        background-color #ffffff
        margin-top 13px
        border-radius 3px
        .title
            padding 10px
            background-color #f6f6f6
            font-size 14px
            color #444444
            line-height 20px
        .more
            padding 10px
            border-top 1px solid #f0f0f0
            font-size 14px
            color #666666
            line-height 20px
</style>
