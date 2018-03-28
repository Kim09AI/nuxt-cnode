<template>
    <div class="alert" v-show="state">{{ text }}</div>
</template>

<script>
    export default {
        name: 'alert',
        data() {
            return {
                state: false,
                time: 2000,
                text: ''
            }
        },
        methods: {
            show(text) {
                this.text = text
                this.state = true
                clearTimeout(this.timer)

                this.timer = setTimeout(() => {
                    this.state = false
                }, this.time)
            },
            hide() {
                this.state = true
                clearTimeout(this.timer)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .alert
        position fixed
        top 50%
        left 50%
        transform translate(-50%, -50%)
        z-index 999
        background-color #cccccc
        color #ffffff
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 80%
        font-size 16px
        padding 10px 20px
        border-radius 36px
</style>
