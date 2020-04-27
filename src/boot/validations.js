import { parseNumber } from 'src/classes/utils'
export default async ({ app, Vue }) => {
  // eslint-disable-next-line no-useless-escape
  var _emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  Vue.prototype.$validations = {
    required: val => {
      return !!val || app.i18n.t('vmsg.required')
    },
    email: val => {
      return (
        !val || _emailRe.test(val.toLowerCase()) || app.i18n.t('vmsg.email')
      )
    },
    number: val => {
      var float = parseNumber(val)
      return float === null && val !== null ? app.i18n.t('vmsg.number') : true
    },
    minLength: len => val => {
      return (
        val.length >= len || app.i18n.t('vmsg.minLength', { minLength: len })
      )
    },
    maxLength: len => val => {
      return (
        val.length <= len || app.i18n.t('vmsg.maxLength', { maxLength: len })
      )
    }
  }
}
