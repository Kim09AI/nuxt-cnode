<template>
    <panel title="客户端二维码">
        <div class="client-box" slot="content">
            <img src="https://dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="客户端源码地址">
            <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
        </div>
    </panel>
</template>

<script>
    export default {
        name: 'clientPanel'
    }
</script>

<style lang="stylus" scoped>
    .client-box
        text-align center
        img
            width 200px
            height 200px
            margin-bottom 5px
        a
            font-size 13px
            color #778087
            display block
            &:hover
                text-decoration underline
</style>
