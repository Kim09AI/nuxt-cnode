<template>
    <div class="panel-wrapper" v-if="list.length || $slots.content">
        <h3 class="title">{{ title }}</h3>
        <div class="panel-list">
            <template v-if="$slots.content">
                <slot name="content"></slot>
            </template>
            <template v-else>
                <div class="item" v-for="(item, index) in list" :key="index" @click="itemClick(index)">{{ item.title }}</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'panel',
        props: {
            title: {
                type: String
            },
            list: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            itemClick(index) {
                this.$emit('onItemClick', index)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .panel-wrapper
        margin-bottom 13px
        .title
            font-size 13px
            color #444444
            padding 10px
            background-color #f6f6f6
            line-height 20px
        .panel-list
            padding 10px
            background-color #ffffff
            .item
                font-size 14px
                color #778087
                word-break break-all
                padding 8px 0
                cursor pointer
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
</style>
