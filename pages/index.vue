<template>
    <main-layout>
        <div slot="content">
            <div class="tabs">
                <nuxt-link
                    class="tab"
                    :class="{ active: item.tab === tab }"
                    v-for="item in tabs"
                    :key="item.tab"
                    :to="`/?tab=${encodeURIComponent(item.tab)}`"
                    v-text="item.text"
                ></nuxt-link>
            </div>
            <topic-list :topicList="list"/>
            <page-nav :currentPage="page" @onPageChange="pageSwitch"/>
        </div>
        <div slot="slidebar">
            <user-info-panel v-if="isLogin" title="个人信息" :user="user"/>
            <topic-create-panel/>
            <panel title="无人回复的话题" :list="noReplyList" @onItemClick="noReplyListHandler"/>
            <client-panel/>
        </div>
    </main-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import topicList from '~/components/topicList'
    import pageNav from '~/components/pageNav'
    import userInfoPanel from '~/components/userInfoPanel'
    import topicCreatePanel from '~/components/topicCreatePanel'
    import clientPanel from '~/components/clientPanel'
    import { getTopics } from '~/api'
    import scrollFunc from '~/utils/scroll'

    export default {
        name: 'index',
        async asyncData({ query, store }) {
            let { tab, page } = query

            try {
                let res = await store.$axios.getTopics(page, tab)
                if (res.success) {
                    return {
                        list: res.data
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                tabs: [
                    { text: '全部', tab: 'all' },
                    { text: '精华', tab: 'good' },
                    { text: '分享', tab: 'share' },
                    { text: '问答', tab: 'ask' },
                    { text: '招聘', tab: 'job' },
                    { text: '客户端测试', tab: 'dev' }
                ],
                tab: this.$route.query.tab || 'all',
                page: Number(this.$route.query.page) || 1,
                list: []
            }
        },
        methods: {
            async getTopics() {
                try {
                    let res = await this.$axios.getTopics(this.page, this.tab)
                    if (res.success) {
                        this.list = res.data
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            pageSwitch(page) {
                this.$router.push(`/?tab=${encodeURIComponent(this.tab)}&page=${encodeURIComponent(page)}`)
            },
            noReplyListHandler(index) {
                let item = this.noReplyList[index]
                this.$router.push(`/topic/${item.id}`)
            }
        },
        computed: {
            noReplyList() {
                let noReplyList = this.list.filter(item => item.reply_count === 0)
                return noReplyList
            },
            ...mapGetters([
                'isLogin',
                'user'
            ])
        },
        watch: {
            async '$route'(to) {
                this.tab = to.query.tab || 'all'
                this.page = Number(to.query.page) || 1

                await this.getTopics()
                scrollFunc.scrollToTop()
            }
        },
        components: {
            topicList,
            pageNav,
            userInfoPanel,
            topicCreatePanel,
            clientPanel
        }
    }
</script>

<style lang="stylus" scoped>
    .tabs
        color #80bd01
        background-color #f6f6f6
        padding 10px
        display flex
        flex-wrap wrap
        .tab
            padding 5px 4px
            border-radius 3px
            margin 0 10px
            font-size 14px
            color #80bd01
            &.active
                background-color #80bd01
                color #ffffff
</style>
