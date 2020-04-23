var passport = require('passport')
var express = require('express')
const authRouter = express.Router()
var FacebookStrategy = require('passport-facebook').Strategy
var config = require('./configs')
var db = require('./db')
var cookieParser = require('cookie-parser')
var session = require('express-session')

authRouter.post(
  '/auth/login',
  passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login'
  })
)
passport.serializeUser(async function (user, done) {
  console.log('Serializing', user.id)
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  var dba = await db.db()
  console.log('deserializing', id)
  try {
    var usr = await dba.User.findOne({ id })
    console.log('deserialized', usr)
    done(null, usr)
  } catch (e) {
    done(e)
  }
})
// var test = async function () {
//   console.log('got db', dba)
//   console.log('got col', dba.User)
// }
// test()
passport.use(
  new FacebookStrategy(
    {
      clientID: config.appConfig.auth.facebook.clientId,
      clientSecret: config.appConfig.auth.facebook.clientSecret,
      callbackURL: 'http://localhost:8989/auth/facebook/callback'
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log('result login', accessToken, refreshToken, profile)
      var dba = await db.db()
      var result = await dba.User.findOneAndUpdate(
        { id: profile.id },
        { $set: profile },
        { upsert: true }
      )
      done(null, result.value)
    }
  )
)
module.exports.handleAuth = function ({ app }) {
  app.use(cookieParser())
  app.use(session({ secret: 'keyboard cat' }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.get(
    '/auth/me',
    passport.authenticate('facebook', { session: false }),
    function (req, res) {
      res.json({ id: req.user.id, username: req.user.username })
    }
  )
  app.get('/auth/facebook', passport.authenticate('facebook'))
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
