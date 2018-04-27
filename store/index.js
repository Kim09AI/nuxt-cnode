import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import CreateAxios from '../utils/axios'

Vue.use(Vuex)

const store = () => {
    let store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })

    store.$axios = store.state.$axios =  new CreateAxios(store)

    return store
}

export default store
