var passport = require('passport')
var FacebookTokenStrategy = require('passport-facebook-token')
var config = require('./configs')
var db = require('./db')

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

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.appConfig.auth.facebook.clientId,
      clientSecret: config.appConfig.auth.facebook.clientSecret
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log('result login', accessToken, refreshToken, profile)
      var dba = await db.db()
      var user = Object.assign({}, profile)
      user.firstName = user.name.givenName
      user.lastName = user.name.familyName
      user.email = user.emails[0].value
      user.avatar = user.photos[0].value
      delete user.photos
      delete user.emails
      delete user.name
      delete user._raw
      delete user._json
      console.log('creating', user)
      var result = await dba.User.findOneAndUpdate(
        { id: profile.id },
        { $set: user },
        { upsert: true }
      )
      done(null, result.value)
    }
  )
)
module.exports.handleAuth = function ({ app }) {
  app.use(passport.initialize())
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook-token'),
    (req, res) => {
      if (req.user) {
        res.status(200).json(req.user)
      } else {
        res.send(401)
      }
    }
  )
}
