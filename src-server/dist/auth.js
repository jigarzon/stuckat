'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var config = require('./configs');
var db = require('./db');

passport.serializeUser(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, done) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Serializing', user.id);
            done(null, user.id);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

passport.deserializeUser(function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, done) {
    var dba, usr;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db.db();

          case 2:
            dba = _context2.sent;

            console.log('deserializing', id);
            _context2.prev = 4;
            _context2.next = 7;
            return dba.User.findOne({ id: id });

          case 7:
            usr = _context2.sent;

            console.log('deserialized', usr);
            done(null, usr);
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](4);

            done(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

passport.use(new FacebookTokenStrategy({
  clientID: config.appConfig.auth.facebook.clientId,
  clientSecret: config.appConfig.auth.facebook.clientSecret
}, function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(accessToken, refreshToken, profile, done) {
    var dba, user, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('result login', accessToken, refreshToken, profile);
            _context3.next = 3;
            return db.db();

          case 3:
            dba = _context3.sent;
            user = Object.assign({}, profile);

            user.firstName = user.name.givenName;
            user.lastName = user.name.familyName;
            user.email = user.emails[0].value;
            user.avatar = user.photos[0].value;
            delete user.photos;
            delete user.emails;
            delete user.name;
            delete user._raw;
            delete user._json;
            console.log('creating', user);
            _context3.next = 17;
            return dba.User.findOneAndUpdate({ id: profile.id }, { $set: user }, { upsert: true });

          case 17:
            result = _context3.sent;

            done(null, result.value);

          case 19:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}()));
module.exports.handleAuth = function (_ref4) {
  var app = _ref4.app;

  app.use(passport.initialize());
  app.get('/auth/facebook/callback', passport.authenticate('facebook-token'), function (req, res) {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.send(401);
    }
  });
};
//# sourceMappingURL=auth.js.map