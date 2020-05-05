const apiRouter = require('express').Router()
apiRouter.use('/', require('./cases'))
apiRouter.use('/', require('./auth'))
apiRouter.use('/', require('./contact'))
apiRouter.use('/', require('./stats'))

module.exports = apiRouter
