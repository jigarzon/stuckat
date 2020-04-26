import axios from 'axios'

export default async ({ Vue, store }) => {
  var hostname = process.env.API_HOST || 'localhost'
  var port = process.env.API_PORT || 8989
  const host = window.location.protocol + '//' + hostname + ':' + port

  // if (ssrContext && ssrContext.req) {
  //   const req = ssrContext.req
  //   var hostname = process.env.API_HOST || 'localhost'
  //   var port = process.env.API_PORT || 8989
  //   host = req.protocol + '://' + hostname + ':' + port
  // } else {
  //   host = window.location.protocol + '//' + window.location.host
  // }
  var url = host + '/app_config.json'
  try {
    var config = await axios.get(url)
  } catch (e) {
    console.error('Unable to load config at ' + url)
    throw e
  }
  Vue.prototype.$config = config.data
  store.$config = config.data
}
