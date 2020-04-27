/* eslint-disable no-unused-vars */
var ObjectID = require('mongodb').ObjectID
const stuckedRouter = require("express").Router();
stuckedRouter.post("/cases", async (req, res) => {
  var Case = req.db.collection('Case')
  var caseInfo = req.body;
  console.log("creating case for user id", req.user._id)
  var userId = new ObjectID(req.user._id);
  caseInfo.userId = userId;
  caseInfo.createdAt = new Date()
  var result = await Case.insertOne(caseInfo);
  res.send({ result: "OK", case: result.value });
});

module.exports = stuckedRouter;
