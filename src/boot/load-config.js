import axios from 'axios'

export default async ({ Vue, store }) => {
  var hostname = process.env.API_HOST || window.location.hostname
  var port = process.env.API_PORT || window.location.port
  const host = window.location.protocol + '//' + hostname + (port ? ':' + port : '')

  // if (ssrContext && ssrContext.req) {
  //   const req = ssrContext.req
  //   var hostname = process.env.API_HOST || 'localhost'
  //   var port = process.env.API_PORT || 8989
  //   host = req.protocol + '://' + hostname + ':' + port
  // } else {
  //   host = window.location.protocol + '//' + window.location.host
  // }
  try {
    var config = await axios.get(host + '/app_config.json')
    var runConfig = await axios.get(host + '/run_config.json')
  } catch (e) {
    console.error('Unable to load config at ' + host + '/app_config.json')
    throw e
  }
  Vue.prototype.$config = config.data
  Vue.prototype.$runConfig = runConfig.data
  store.$config = config.data
}
