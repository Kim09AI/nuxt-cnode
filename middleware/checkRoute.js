export default function({ route, redirect }) {
    // 没有匹配到的组件，即404页面
    if (route.matched.length === 0) {
        redirect('/')
    }
}
