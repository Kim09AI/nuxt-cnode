const { resolve } = require('path')

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'CNode：Node.js专业中文社区',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    css: [{ src: '~assets/css/index.styl', lang: 'stylus' }],
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        vendor: ['axios', 'simplemde', 'js-cookie', 'qs'],
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    plugins: [
        '~plugins/component',
        '~plugins/filter',
        '~plugins/ssrAccessToken'
    ],
    router: {
        extendRoutes(routes) {
            // 复用topic的create页面
            routes.push({
                name: 'edit',
                path: '/topic/:id/edit',
                component: resolve(__dirname, 'pages/topic/create.vue')
            })
        }
    }
}
