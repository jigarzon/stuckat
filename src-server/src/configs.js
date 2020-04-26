var runConfig = require('./public/run_config.json')
var nestedAssign = require('nested-object-assign')
var appConfig = JSON.parse(process.env.APP_CONFIG)
var clientConfig = {}
var serverConfig = {}
if (appConfig && appConfig.common) {
  nestedAssign(clientConfig, appConfig.common)
  nestedAssign(serverConfig, appConfig.common)
}
if (appConfig.client) {
  nestedAssign(clientConfig, appConfig.client)
}
if (appConfig.server) {
  nestedAssign(serverConfig, appConfig.server)
}
module.exports.appConfig = serverConfig
module.exports.runConfig = runConfig

module.exports.handleConfigs = function ({ app }) {
  app.get('/app_config.json', function (req, res) {
    res.send(clientConfig)
  })
}
