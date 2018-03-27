import Vue from 'vue'
import * as filters from '../filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
