<template>
    <main-layout>
        <div slot="content">
            <tab-header text="新消息"/>
            <div class="list-wrapper">
                <message-list v-if="notReadMessages.length > 0" :list="notReadMessages"/>
                <div v-else class="not-message">无消息</div>
            </div>
            <div class="list-wrapper mt13">
                <div class="title">过往消息</div>
                <message-list v-if="readMessages.length > 0" :list="readMessages"/>
                <div v-else class="not-message">无消息</div>
            </div>
        </div>
        <div slot="slidebar">
            <user-info-panel title="个人信息" :user="user"/>
            <topic-create-panel/>
            <client-panel/>
        </div>
    </main-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import tabHeader from '~/components/tabHeader'
    import userInfoPanel from '~/components/userInfoPanel'
    import topicCreatePanel from '~/components/topicCreatePanel'
    import clientPanel from '~/components/clientPanel'
    import messageList from '~/components/messageList'
    import { getMessages, messageMarkAll } from '~/api'

    export default {
        name: 'messages',
        middleware: 'auth',
        async asyncData() {
            try {
                let res = await getMessages()

                if (res.success) {
                    return {
                        readMessages: res.data.has_read_messages,
                        notReadMessages: res.data.hasnot_read_messages
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                readMessages: [],
                notReadMessages: []
            }
        },
        mounted() {
            this.messageMarkAll()
        },
        methods: {
            async messageMarkAll() {
                if (this.notReadMessages.length) {
                    await messageMarkAll()
                }
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        components: {
            tabHeader,
            userInfoPanel,
            topicCreatePanel,
            clientPanel,
            messageList
        }
    }
</script>

<style lang="stylus" scoped>
    .mt13
        margin-top 13px
    .list-wrapper
        background-color #ffffff
        border-radius 3px
        .title
            padding 10px
            background-color #f6f6f6
            font-size 14px
            color #444444
            line-height 20px
        .not-message
            font-size 14px
            color #333
            border-bottom 1px solid #f0f0f0
            padding 10px
</style>
