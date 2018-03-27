import axios from '../utils/axios'

export const getTopics = (page = 1, tab = 'all', limit = 40, mdrender = 'false') => {
    return axios.get('/topics', {
        params: {
            page,
            tab,
            limit,
            mdrender
        }
    })
}
