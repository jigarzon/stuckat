const configs = require('./configs')
const apiRoutes = require('./api')
var express = require('express')
var middleware = require('./middleware')
const auth = require('./auth')
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}
module.exports.extendApp = function (context) {
  context.app.use(express.json())
  context.app.use(middleware(configs.appConfig))
  configs.handleConfigs(context)
  auth.handleAuth(context)
  context.app.use('/api', apiRoutes)
}
process.on('unhandledRejection', (error, promise) => {
  try {
    console.error('Unhandled rejection in Server', {
      detail: {
        requestData: error && error.request && error.request._currentUrl,
        error,
        promise
      }
    })
  } catch (e) {
    console.error('Unhandled rejection in Server', { detail: error, e: e })
  }
})
