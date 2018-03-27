<template>
    <div>
        <common-header/>
        <nuxt/>
        <common-footer/>
        <back-top/>
    </div>
</template>

<script>
    import commonHeader from '../components/commonHeader'
    import commonFooter from '../components/commonFooter'
    import backTop from '../components/backTop'

    export default {
        components: {
            commonHeader,
            commonFooter,
            backTop
        }
    }
</script>

<style lang="stylus">

</style>
