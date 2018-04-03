<template>
    <main-layout>
        <div slot="content">
            <tab-header text="登录"/>
            <div class="login-wrapper">
                <div class="login-pos">
                    <input class="input" type="text" placeholder="请输入access_token" v-model.trim="accessToken">
                    <div>
                        <span @click="login" class="login-btn">登录</span>
                    </div>
                </div>
                <div class="tip">如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken</div>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import tabHeader from '~/components/tabHeader'
    import { getUserDetail, checkAccesstoken } from '~/api'

    let Cookie

    export default {
        name: 'login',
        middleware({ store, redirect }) {
            if (store.state.isLogin) {
                redirect('/')
            }
        },
        data() {
            return {
                accessToken: ''
            }
        },
        mounted() {
            Cookie = require('js-cookie')
        },
        methods: {
            ...mapActions([
                'setLoginAndUser'
            ]),
            login() {
                if (!this.accessToken) {
                    this.$Alert.show('内容不能为空')
                    return
                }

                this.checkAccesstoken()
            },
            async checkAccesstoken() {
                try {
                    let res = await checkAccesstoken(this.accessToken)
                    if (res.success) {
                        let userDetail = await getUserDetail(res.loginname)
                        userDetail.data.id = res.id

                        this.setLoginAndUser({
                            loginState: true,
                            user: userDetail.data
                        })

                        Cookie.set('access_token', this.accessToken, { expires: 30 })

                        this.$router.replace('/')
                    } else {
                       this.$Alert.show(res.error_msg)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },
        components: {
            tabHeader
        }
    }
</script>

<style lang="stylus" scoped>
    .login-wrapper
        padding 10px
        background-color #ffffff
        .login-pos
            margin 60px 0 20px 15%
            .input
                padding 4px 6px
                height 20px
                font-size 14px
                color #555
                border-radius 4px
                max-width 270px
                width 90%
                display inline-block
                box-shadow inset 0 1px 2px rgba(0, 0, 0, .075)
                border 1px solid #cccccc
                outline none
                transition all 0.3s
                &:focus
                    border-color rgba(82, 168, 236, .8)
                    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(82, 168, 236, .6)
            .login-btn
                padding 7px 10px
                border-radius 3px
                background-color #08c
                color #ffffff
                cursor pointer
                font-size 14px
                display inline-block
                margin-top 25px
        .tip
            padding 10px
            word-break break-all
            line-height 2em
            font-size 14px
            color #333
</style>
