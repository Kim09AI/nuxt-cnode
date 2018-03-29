<template>
    <main-layout>
        <div slot="content">
            <tab-header/>
            <div class="tab-selector">选择版块: 客户端测试</div>
            <div class="title-wrapper">
                <input class="title" type="text" v-model.trim="title" placeholder="标题字数 10 字以上">
            </div>
            <markdown commitText="提交" @commitValue="commit" ref="markdown"/>
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
    import { createTopic } from '~/api'

    export default {
        name: 'create',
        data() {
            return {
                title: '',
                value: '',
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
        methods: {
            commit(value) {
                this.value = value
                if (this.check()) {
                    this.createTopic()
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
                    let res = await createTopic(this.title, this.value)
                    if (res.success) {
                        this.$Alert.show('创建成功')
                        this.$router.push(`/topic/${res.topic_id}`)
                    }
                } catch (e) {
                    console.log(e)
                }
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
    .title-wrapper
        background-color #ffffff
        padding-left 10px
        .title
            height 20px
            width 98%
            box-shadow 0 0 2px rgba(60,60,60,.5)
            border-radius 4px
            font-size 14px
            padding 4px 6px
            border none
            outline none
            margin 0 auto
</style>
