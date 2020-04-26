module.exports = function ({ config }) {
  const routes = require('express').Router()

  // add middleware here
  // routes.use('/api', tokenVerify({ config }))
  return routes
}
