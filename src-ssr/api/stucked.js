/* eslint-disable no-unused-vars */
const stuckedRouter = require('express').Router()
const config = require('../configs').appConfig

stuckedRouter.post(
  '/stucked', async (req, res) => {
    res.send({ result: 'OK' })
  }
)

module.exports = stuckedRouter
