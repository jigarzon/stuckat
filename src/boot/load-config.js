import axios from 'axios'

export default async ({ Vue, store, ssrContext }) => {
  let host
  if (ssrContext && ssrContext.req) {
    console.log('SSR', process.env)
    const req = ssrContext.req
    var hostname = process.env.APP_HOST || 'localhost'
    var port = process.env.APP_PORT || 8989
    host = req.protocol + '://' + hostname + ':' + port
  } else {
    host = window.location.protocol + '//' + window.location.host
  }
  var url = host + '/app_config.json'
  try {
    var config = await axios.get(url)
  } catch (e) {
    console.error('Unable to load config at ' + url)
    throw e
  }
  Vue.prototype.$config = config.data
}
