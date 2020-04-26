const apiRouter = require('express').Router()
apiRouter.use('/', require('./cases'))
apiRouter.use('/', require('./auth'))

module.exports = apiRouter
