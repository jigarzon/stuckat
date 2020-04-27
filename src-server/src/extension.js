const configs = require('./configs')
const apiRoutes = require('./api')
var express = require('express')
var db = require('./db')
var middleware = require('./middleware')
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}
module.exports.extendApp = function (context) {
  context.app.use(express.json())
  configs.handleConfigs(context)
  db.handleDatabase(context)
  context.app.use(middleware(configs.appConfig))
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
