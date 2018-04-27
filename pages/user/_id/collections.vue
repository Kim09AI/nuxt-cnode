<template>
    <main-layout>
        <div slot="content">
            <tab-header :text="`${$route.params.id} 收藏的话题`"/>
            <topic-list :topicList="topicCollect"/>
            <page-nav :currentPage="currentPage" :total="total" @onPageChange="pageSwitch"/>
        </div>
        <div slot="slidebar">
            <user-info-panel title="个人信息" :user="userDetail"/>
            <topic-create-panel/>
            <client-panel/>
        </div>
    </main-layout>
</template>

<script>
    import tabHeader from '~/components/tabHeader'
    import userInfoPanel from '~/components/userInfoPanel'
    import topicCreatePanel from '~/components/topicCreatePanel'
    import clientPanel from '~/components/clientPanel'
    import topicList from '~/components/topicList'
    import pageNav from '~/components/pageNav'

    export default {
        name: 'collections',
        async asyncData({ params, store }) {
            let loginname = params.id

            try {
                let [userDetail, topicCollect] = await Promise.all([
                    store.$axios.getUserDetail(loginname),
                    store.$axios.getTopicCollect(loginname)
                ])

                if (userDetail.success && topicCollect.success) {
                    return {
                        userDetail: userDetail.data,
                        topicCollect: topicCollect.data
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                currentPage: 1,
                total: 1
            }
        },
        methods: {
            pageSwitch(pageNum) {
                console.log(pageNum)
            }
        },
        components: {
            tabHeader,
            userInfoPanel,
            topicCreatePanel,
            clientPanel,
            topicList,
            pageNav
        }
    }
</script>

<style lang="stylus" scoped>

</style>
