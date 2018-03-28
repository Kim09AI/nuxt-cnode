<template>
    <div class="textarea-wrapper" v-show="SimpleMDE">
        <div v-if="title" class="title">{{ title }}</div>
        <textarea ref="textarea"></textarea>
        <div>
            <span class="reply-btn" @click="reply">{{ commitText }}</span>
        </div>
    </div>
</template>

<script>
    // style标签加了scoped启用了作用域，通过import的方式就可以匹配到对应的cover样式了
    import '~/assets/css/simplemdecover.styl'

    export default {
        name: 'markdown',
        props: {
            title: String,
            commitText: {
                type: String,
                default: '回复'
            },
            placeholder: {
                type: String,
                default: 'Try here...'
            }
        },
        data() {
            return {
                markdown: null,
                SimpleMDE: null
            }
        },
        mounted() {
            // 因为SimpleMDE依赖了浏览器的api，在做服务端渲染时会报错，需要动态引入SimpleMDE
            this.SimpleMDE = require('simplemde')
            this.initMarkdown()
        },
        methods: {
            initMarkdown() {
                this.markdown = new this.SimpleMDE({
                    element: this.$refs.textarea,
                    status: false,
                    placeholder: this.placeholder
                })
            },
            reply() {
                let value = this.markdown.value()
                this.$emit('commitValue', value)
            },
            getValue() {
                return this.markdown && this.markdown.value()
            },
            getMarkdown() {
                return this.markdown && this.markdown.markdown(this.getValue())
            },
            clear() {
                this.markdown && this.markdown.value('')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'

    .textarea-wrapper
        background-color #ffffff
        border-radius 0 0 3px 3px
        .title
            padding 10px
            line-height 20px
            color #444444
            font-size 14px
            border-radius 3px 3px 0 0
            background-color #f6f6f6
        .reply-btn
            font-size 14px
            background-color #08c
            color #ffffff
            border-radius 3px
            padding 3px 10px
            display inline-block
            margin 0 0 10px 10px
            line-height 2em
            cursor pointer
            transition all 0.2s ease-in-out
            &:hover
                background-color #05c
</style>
