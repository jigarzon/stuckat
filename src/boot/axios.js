import axios from 'axios'
export default ({ Vue, store }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$http = axios
  store.$axios = axios
}
