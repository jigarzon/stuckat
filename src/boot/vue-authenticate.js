import VueAuthenticate from 'vue-authenticate'
export default async ({ app, router, Vue, store }) => {
  var config = Vue.prototype.$config
  const vueAuthConfig = {
    baseUrl: config.apiUrl,
    providers: {
      facebook: {
        clientId: config.auth.facebook.clientId,
        responseType: 'token',
        authorizationEndpoint: config.auth.facebook.endpoint
      }
    }
  }
  Vue.use(VueAuthenticate, vueAuthConfig)
  store.$auth = Vue.prototype.$auth
}
