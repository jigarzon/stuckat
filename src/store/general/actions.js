export async function socialAuth ({ commit, dispatch }, provider) {
  var resp = await this.$auth.authenticate(provider)
  var userData
  switch (provider) {
    case 'facebook':
      userData = await this.$axios.get('/auth/facebook/callback', {
        params: { access_token: resp.access_token }
      })
      commit('setAccessToken', userData.data.accessToken)
      delete userData.data.accessToken
      commit('setUser', userData.data.user)
      break
    case 'google':
      userData = await this.$axios.get('/auth/google/callback', {
        params: { access_token: resp.access_token }
      })
      console.log('response user data', JSON.stringify(userData.data))
      commit('setAccessToken', userData.data.accessToken)
      delete userData.data.accessToken
      commit('setUser', userData.data.user)
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
export async function loadProvinces ({ commit, state }) {
  if (!state.provinces || state.provinces.length === 0) {
    var url = this.$config.geoApiUrl + '/provincias?campos=id,nombre'
    var resp = await this.$axios.get(url)
    var provs = resp.data.provincias.map(x => ({
      value: { id: x.id, label: x.nombre },
      label: x.nombre
    }))
    provs.sort((a, b) => {
      if (a.label > b.label) return 1
      if (a.label < b.label) return -1
      return 0
    })
    commit('setProvinces', provs)
  } else {
    var provinces = state.provinces
    provinces.sort((a, b) => {
      if (a.label > b.label) return 1
      if (a.label < b.label) return -1
      return 0
    })
    commit('setProvinces', provinces)
  }
}
