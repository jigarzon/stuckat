export async function socialAuth ({ commit, dispatch }, provider) {
  var resp = await this.$auth.authenticate(provider)
  var userData
  switch (provider) {
    case 'facebook':
      userData = await this.$axios.get('/auth/facebook/callback', {
        params: { access_token: resp.access_token }
      })
      commit('setAccessToken', resp.access_token)
      commit('setUser', userData.data)
      break
  }
}
export async function logout ({ commit, dispatch }) {
  await dispatch('revokeAuth')

  location.replace('/')
}
export async function revokeAuth ({ commit }) {
  try {
    if (this.$auth) {
      // only client side
      await this.$auth.logout()
    }
  } catch (e) {
    console.error('logout error', e)
  } finally {
    commit('setAccessToken', null)
    commit('setUser', null)
  }
}
