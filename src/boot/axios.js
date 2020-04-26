import axios from 'axios'
export default ({ Vue, store }) => {
  var $axios = axios.create({ baseURL: Vue.prototype.$config.apiUrl })

  Vue.prototype.$axios = $axios
  Vue.prototype.$http = $axios
  store.$axios = $axios
}
