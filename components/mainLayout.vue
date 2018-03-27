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
        .content
            flex 1
            max-width 1095px
        .slidebar
            width 290px
</style>
