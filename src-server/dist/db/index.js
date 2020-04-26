'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = require('mongodb').MongoClient;
var appConfig = require('../configs').appConfig;
var url = appConfig.db.connection;
// Database Name
var dbName = appConfig.db.name;
var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var database;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.connect();

          case 2:
            database = client.db(dbName);
            return _context.abrupt('return', {
              db: database,
              User: database.collection('User')
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function db() {
    return _ref.apply(this, arguments);
  };
}();
module.exports.client = client;
module.exports.db = db;
//# sourceMappingURL=index.js.map