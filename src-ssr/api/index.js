const apiRouter = require('express').Router()
apiRouter.use('/', require('./stucked'))
apiRouter.use('/', require('./auth'))

module.exports = apiRouter
