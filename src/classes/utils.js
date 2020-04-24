/**
 * Returns Boolean indicating if required roles are fulfilled by user's roles.
 * @param {Object} userRoles Associative map like {admin: true, offerer: false} with user's roles.
 * @param {Array} requiredRoles Array of required roles, like ['admin', 'offerer']. If user has at least one, true is returned.
 */
import { Quasar } from 'quasar'

export function rolesOk (userRoles, requiredRoles) {
  if (!requiredRoles || requiredRoles.length === 0) return true
  if (!userRoles || userRoles.length === 0) return false
  return requiredRoles.some(role => userRoles[role])
}
export function parseNumber (value, locale) {
  if (!value) return null
  if (typeof value === 'number') {
    return value
  }
  if (!locale) locale = Quasar.lang.getLocale()
  const example = Intl.NumberFormat(locale).format('1.1')
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, 'g')
  const cleaned = value.replace(cleanPattern, '')
  const normalized = cleaned.replace(example.charAt(1), '.')
  return parseFloat(normalized)
}
export function formatNumber (value, locale) {
  var float
  if (!locale) locale = Quasar.lang.getLocale()
  if (typeof value === 'number') {
    float = value
  } else {
    float = parseNumber(value, locale)
  }
  if (isNaN(float)) {
    return null
  } else {
    return new Intl.NumberFormat(locale).format(float)
  }
}
export function getUrlParams (search = '') {
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((acc, hash) => {
    // eslint-disable-next-line
    const [key, val] = hash.split('=');
    return {
      ...acc,
      [key]: decodeURIComponent(val)
    }
  }, {})
}
