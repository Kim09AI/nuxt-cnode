<template>
    <main-layout>
        <div slot="content">
            <tab-header :text="isEdit ? '编辑话题' : '发布话题'"/>
            <div class="tab-selector">
                选择版块:&nbsp;
                <select class="select" v-if="isEdit" v-model="tab">
                    <option value="all">请选择</option>
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                    <option value="dev">客户端测试</option>
                </select>
                <span v-else>客户端测试</span>
            </div>
            <div class="title-wrapper">
                <input class="title" type="text" v-model.trim="title" placeholder="标题字数 10 字以上">
            </div>
            <markdown
                commitText="提交"
                :height="markdownHeight"
                :isCommit="isCommit"
                :initialValue="isEdit ? topic.content : ''"
                activeText="提交中..."
                @commitValue="commit"
                ref="markdown"
            />
        </div>
        <div slot="slidebar">
            <panel title="Markdown 语法参考" :list="markdownTipList" @onItemClick="tipClick"/>
            <panel title="话题发布指南" :list="postTipList"/>
        </div>
    </main-layout>
</template>

<script>
    import markdown from '~/components/markdown'
    import tabHeader from '~/components/tabHeader'

    export default {
        name: 'create',
        middleware: 'auth',
        async asyncData({ params, store }) {
            let id = params.id
            // 根据有无id判断topic是创建还是编辑,是创建则直接return
            if (!id) return

            try {
                let topic = await store.$axios.getTopicById(id, false)

                return {
                    topic: topic.data
                }
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                title: '',
                value: '',
                tab: 'all',
                isEdit: !!this.$route.params.id, // 判断是create还是edit
                isCommit: false, // 是否正在创建topic
                markdownHeight: 500, // markdown编辑器的高度
                markdownTipList: [
                    { title: '### 单行的标题' },
                    { title: '**粗体**' },
                    { title: '`console.log(行内代码)`' },
                    { title: '```js\n code \n``` 标记代码块' },
                    { title: '[内容](链接)' },
                    { title: '![文字说明](图片链接)' },
                    { title: 'Markdown 文档', link: 'https://segmentfault.com/markdown' }
                ],
                postTipList: [
                    { title: '尽量把话题要点浓缩到标题里' },
                    { title: '代码含义和报错可在 SegmentFault 提问' }
                ]
            }
        },
        created() {
            if (this.isEdit) {
                this.title = this.topic.title
                this.tab = this.topic.tab
            }
        },
        methods: {
            commit(value) {
                this.isCommit = true
                this.value = value
                if (this.check()) {
                    this.isEdit ? this.topicUpdate() : this.createTopic()
                } else {
                    this.isCommit = false
                }
            },
            check() {
                if (this.title.length <= 10) {
                    this.$Alert.show('请输入 10 字以上的标题')
                    return false
                }
                if (!this.value) {
                    this.$Alert.show('内容不能为空')
                    return false
                }
                return true
            },
            async createTopic() {
                try {
                    let res = await this.$axios.createTopic(this.title, this.value)

                    if (res.success) {
                        this.$router.push(`/topic/${res.topic_id}`)
                    }
                } catch (e) {
                    console.log(e)
                }
                this.isCommit = false
            },
            async topicUpdate() {
                try {
                    let { id } = this.topic
                    let res = await this.$axios.topicUpdate(id, this.title, this.value, this.tab)

                    if (res.success) {
                        this.$router.go(-1)
                    }
                } catch (e) {
                    console.log(e)
                }
                this.isCommit = false
            },
            tipClick(index) {
                let { link } = this.markdownTipList[index]
                if (link) {
                    let a = document.createElement('a')
                    a.href = link
                    a.target = '_blank'
                    a.click()
                }
            }
        },
        components: {
            markdown,
            tabHeader
        }
    }
</script>

<style lang="stylus" scoped>
    .tab-selector
        font-size 14px
        color #333333
        padding 15px 10px
        background-color #ffffff
        .select
            width 220px
            border 1px solid #cccccc
            padding 4px 6px
            border-radius 4px
            outline none
    .title-wrapper
        background-color #ffffff
        padding-left 10px
        .title
            height 20px
            width calc(98% - 12px)
            box-shadow 0 0 2px rgba(60,60,60,.5)
            border-radius 4px
            font-size 14px
            padding 4px 6px
            border none
            outline none
            margin 0 auto
</style>
