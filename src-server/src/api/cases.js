/* eslint-disable no-unused-vars */
const stuckedRouter = require('express').Router()
const config = require('../configs').appConfig
var passport = require('passport')
var db = require('../db')
stuckedRouter.post(
  '/cases', passport.authenticate('facebook-token'),async (req, res) => {
    var dba = await db.db()
    var userId = req.user.id
    var caseInfo = req.body
    caseInfo.userId = userId
    var result = await dba.Case.insertOne(
      caseInfo
    )
    res.send({ result: 'OK', case: caseInfo })
  }
)

module.exports = stuckedRouter
