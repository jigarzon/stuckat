var runConfig = require('./run_config.json')
var appConfig = JSON.parse(process.env.APP_CONFIG)
var clientConfig = {}
var serverConfig = {}
if (appConfig && appConfig.common) {
  Object.assign(clientConfig, appConfig.common)
  Object.assign(serverConfig, appConfig.common)
}
if (appConfig.client) {
  Object.assign(clientConfig, appConfig.client)
}
if (appConfig.server) {
  Object.assign(serverConfig, appConfig.server)
}
module.exports.appConfig = serverConfig
module.exports.runConfig = runConfig

module.exports.handleConfigs = function ({ app }) {
  app.get('/run_config.json', function (req, res) {
    res.send(runConfig)
  })
  app.get('/app_config.json', function (req, res) {
    res.send(clientConfig)
  })
}
