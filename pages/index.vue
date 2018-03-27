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
            <panel title="无人回复的话题" :list="noReplyList"/>
            <panel title="客户端二维码">
                <div class="client-box" slot="content">
                    <img src="https://dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="客户端源码地址">
                    <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
                </div>
            </panel>
        </div>
    </main-layout>
</template>

<script>
    import topicList from '../components/topicList'
    import pageNav from '../components/pageNav'
    import panel from '../components/panel'
    import { getTopics } from '../api'
    import scrollFunc from '../utils/scroll'

    const _getTopics = async (...args) => {
        try {
            let res = await getTopics(...args)
            console.log('success', typeof res)
            if (res && res.success) {
                return res.data
            }
        } catch (e) {
            console.log(e)
        }
        return []
    }

    export default {
        name: 'index',
        async asyncData({ query }) {
            let { tab, page } = query
            let list = await _getTopics(page, tab)
            return { list }
        },
        head() {
            return {
                title: 'CNode：Node.js专业中文社区'
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
                let list = await _getTopics(this.page, this.tab)
                this.list = list
            },
            pageSwitch(page) {
                this.$router.push(`/?tab=${encodeURIComponent(this.tab)}&page=${encodeURIComponent(page)}`)
            }
        },
        components: {
            topicList,
            pageNav,
            panel
        },
        computed: {
            noReplyList() {
                let noReplyList = this.list.filter(item => item.reply_count === 0)
                return noReplyList
            }
        },
        watch: {
            '$route'(to) {
                this.tab = to.query.tab || 'all'
                this.page = Number(to.query.page) || 1

                this.getTopics()
                scrollFunc.scrollToTop()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .tabs
        color #80bd01
        background-color #f6f6f6
        padding 10px
        .tab
            padding 3px 4px
            border-radius 3px
            margin 0 10px
            font-size 14px
            color #80bd01
            &.active
                background-color #80bd01
                color #ffffff
    .client-box
        text-align center
        img
            width 200px
            height 200px
            margin-bottom 5px
        a
            font-size 13px
            color #778087
            display block
            &:hover
                text-decoration underline
</style>
