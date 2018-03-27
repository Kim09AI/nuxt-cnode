<template>
    <div class="page-nav-wrapper">
        <div class="page-nav">
            <span class="btn" @click="prev">«</span>
            <span v-show="showLeftSpot">...</span>
            <span class="btn" :class="{active: currentPage === page}" v-for="page in showPageArr" :key="page" @click="switchPage(page)">{{ page }}</span>
            <span v-show="showRightSpot">...</span>
            <span class="btn" @click="next">»</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            showPage: { // 要展示的页数
                type: Number,
                default: 5
            },
            total: { // 总页数，接口里没有，给个默认值
                type: Number,
                default: 93
            }
        },
        methods: {
            getArr(start, end) {
                let ret = []
                while (start <= end) {
                    ret.push(start++)
                }
                return ret
            },
            switchPage(page) {
                let isCurrentPage = this.currentPage === page
                !isCurrentPage && this.$emit('onPageChange', page)
            },
            prev() {
                let isFirstPage = this.currentPage === 1
                !isFirstPage && this.$emit('onPageChange', this.currentPage - 1)
            },
            next() {
                let isLastPage = this.currentPage === this.total
                !isLastPage && this.$emit('onPageChange', this.currentPage + 1)
            }
        },
        computed: {
            showLeftSpot() {
                let centerPage = Math.ceil(this.showPage / 2)
                return this.currentPage > centerPage && this.total > this.showPage
            },
            showRightSpot() {
                let centerPage = Math.ceil(this.showPage / 2)
                return this.total - this.currentPage >= centerPage
            },
            showPageArr() { // 生成当前要展示的页码
                let arr = []
                let showPage = this.showPage
                let total = this.total
                let currentPage = this.currentPage
                let centerPage = Math.ceil(this.showPage / 2)

                if (currentPage <= centerPage) {
                    arr = this.getArr(1, showPage)
                } else if (total - currentPage < centerPage) {
                    let start = total - showPage + 1
                    arr = this.getArr(start, total)
                } else {
                    let start = currentPage - ~~(showPage / 2)
                    let end = currentPage + ~~(showPage / 2)
                    arr = this.getArr(start, end)
                }

                return arr
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .page-nav-wrapper
        padding 10px
        background-color #ffffff
        .page-nav
            border-radius 4px
            border 1px solid #ddd
            display inline-block
            span
                display inline-block
                padding 4px 12px
                color #778087
                line-height 20px
                font-size 14px
                border-left 1px solid #ddd
                &.active
                    color #80bd01
                &.btn
                    cursor pointer
            &:first-child
                border-left none
</style>
