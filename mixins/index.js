import { tabs } from '~/utils'

export const tabFormatMixin = {
    methods:{
        tabFormat(tab, isTop, isGood) {
            if (isTop) {
                return '置顶'
            }
            if (isGood) {
                return '精华'
            }
            return tabs[tab]
        }
    }
}

export const axiosMixin = {
    beforeCreate() {
        // 原因未知，前面有几个组件beforeCreate的this.$store为undefined
        if (this.$store && this.$store.$axios) {
            this.$axios = this.$store.$axios
        }
    }
}
