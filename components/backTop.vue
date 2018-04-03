<template>
    <transition name="fade">
        <div class="back-top" v-show="show" @click="backTop">回到顶部</div>
    </transition>
</template>

<script>
    import scrollFunc from '../utils/scroll'

    export default {
        props: {
            top: {
                type: Number,
                default: 700
            }
        },
        data() {
            return {
                show: false
            }
        },
        mounted() {
            window.addEventListener('scroll', () => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

                this.show = scrollTop >= this.top
            })
        },
        methods: {
            backTop() {
                scrollFunc.scrollToTop()
                this.show = false
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .back-top
        position fixed
        right 0
        padding 12px 0 12px 5px
        color gray
        background-color #ffffff
        z-index 20
        cursor pointer
        top 70%
        font-size 14px
        width 24px
        border-radius 12px 0 0 12px
        line-height 20px
        text-align center

    .fade-enter-active, .fade-leave-active
        transition all 0.6s
    .fade-enter, .fade-leave-to
        opacity 0
</style>
