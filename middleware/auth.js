export default function({ store, redirect }) {
    if (!store.state.isLogin) {
        redirect('/login')
    }
}
