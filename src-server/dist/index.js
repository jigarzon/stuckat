'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extension = require('./extension');

var path = require('path');

var port = 8989;

var app = (0, _express2.default)();
var httpServer = _http2.default.createServer(app);
app.use((0, _cors2.default)({
  exposedHeaders: ['Link']
}));

// 3rd party middleware
var isMultipartRequest = function isMultipartRequest(req) {
  var contentTypeHeader = req.headers['content-type'];
  return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
};

var bodyParserJsonMiddleware = function bodyParserJsonMiddleware() {
  return function (req, res, next) {
    if (isMultipartRequest(req)) {
      return next();
    }
    return _bodyParser2.default.json({
      limit: '50mb'
    })(req, res, next);
  };
};

app.use(bodyParserJsonMiddleware());

var staticFileMiddleware = _express2.default.static(path.join(__dirname, 'public'));
extension.extendApp({ app: app });
// static middleware
app.use(staticFileMiddleware);
// allow vue.js routing (everything not covered in previous middlewares
// will be handled by index.html)
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

httpServer.listen(port, function (err) {
  if (err) {
    console.error('Error starting server  on port ' + httpServer.address().port, err);
  }
  console.debug('Started http on port ' + httpServer.address().port);
}).on('error', function (err) {
  console.error('Error Starting Server', { detail: err });
  process.exit(1);
});
exports.default = app;
//# sourceMappingURL=index.js.map