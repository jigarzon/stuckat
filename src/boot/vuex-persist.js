import VuexPersistence from 'vuex-persist'
import { Cookies } from 'quasar'
// docs:
// https://www.npmjs.com/package/vuex-persist
// https://forum.quasar-framework.org/topic/3306/how-to-make-vuex-store-persist/10

export default async ({ ssrContext, store, Vue }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  // example, will not use vuex local for now, only cookies
  // const vuexLocal = new VuexPersistence({
  //   storage: window.localStorage,
  //   reducer: (state) => ({ navigation: state.navigation }) // only save navigation module
  // })
  const vuexCookie = new VuexPersistence({
    restoreState: (key) => {
      var data = cookies.get(key)
      if (Vue.prototype.$auth && data && data.user && data.user.token) {
        Vue.prototype.$auth.setToken({ access_token: data.user.token })
      }
      return data
    },
    key: 'stuckat',
    saveState: (key, state) => {
      cookies.set(key, state, { path: '/' })
    },
    modules: ['general'], // only save user module
    filter: (mutation) =>
      mutation.type === 'general/setUser' || mutation.type === 'general/setAccessToken'

  })
  vuexCookie.plugin(store)
  // vuexLocal.plugin(store);
}
