<template>
    <div class="main">
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="slidebar">
            <slot name="slidebar"></slot>
        </div>
    </div>
</template>

<style lang="stylus">
    .main
        margin 15px auto
        max-width 1400px
        display flex
        justify-content space-between
        min-height 400px
        box-sizing border-box
        padding 0 5px
        .content
            flex 1
            max-width 1095px
            width calc(100% - 290px - 15px)
        .slidebar
            width 290px
            margin-left 15px

    @media screen and (max-width: 980px)
        .slidebar
            display none
</style>
