import http from 'http'
import express from 'express'
import cors from 'cors';

import bodyParser from 'body-parser'
var extension = require('./extension')

var path = require('path')

var port = 8989

const app = express()
var httpServer = http.createServer(app)
app.use(cors({
  exposedHeaders: ['Link']
}));

// 3rd party middleware
const isMultipartRequest = function (req) {
  const contentTypeHeader = req.headers['content-type']
  return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1
}

const bodyParserJsonMiddleware = function () {
  return function (req, res, next) {
    if (isMultipartRequest(req)) {
      return next()
    }
    return bodyParser.json({
      limit: '50mb'
    })(req, res, next)
  }
}

app.use(bodyParserJsonMiddleware())

const staticFileMiddleware = express.static(path.join(__dirname, 'public'))
extension.extendApp({ app })
// static middleware
app.use(staticFileMiddleware)
// allow vue.js routing (everything not covered in previous middlewares
// will be handled by index.html)
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

httpServer
  .listen(port, err => {
    if (err) {
      console.error(`Error starting server  on port ${httpServer.address().port}`, err)
    }
    console.debug(`Started http on port ${httpServer.address().port}`)
  })
  .on('error', err => {
    console.error('Error Starting Server', { detail: err })
    process.exit(1)
  })
export default app
