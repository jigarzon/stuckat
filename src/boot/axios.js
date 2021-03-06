import axios from 'axios'
export default ({ Vue, store }) => {
  var $axios = axios.create({ baseURL: Vue.prototype.$config.apiUrl })
  $axios.interceptors.request.use((config) => {
    const token = store.state.general.accessToken
    if (token) {
      config.headers['access-token'] = token
    } else if (Vue.prototype.$auth && Vue.prototype.$auth.getToken()) {
      config.headers['access-token'] = Vue.prototype.$auth.getToken()
    }

    return config
  })
  Vue.prototype.$axios = $axios
  Vue.prototype.$http = $axios
  store.$axios = $axios
}
