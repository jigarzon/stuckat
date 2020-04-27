export function setUser (state, user) {
  console.log('setting user', JSON.stringify(user))
  state.user = user
}
export function setAccessToken (state, accessToken) {
  state.accessToken = accessToken
}

export function setProvinces (state, provinces) {
  state.provinces = provinces
}
