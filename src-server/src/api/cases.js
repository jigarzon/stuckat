/* eslint-disable no-unused-vars */
const stuckedRouter = require("express").Router();
var db = require("../db");
stuckedRouter.post("/cases", async (req, res) => {
  var Case = req.db.collection('Case')
  var userId = req.user.id;
  var caseInfo = req.body;
  caseInfo.userId = userId;
  var result = await Case.insertOne(caseInfo);
  res.send({ result: "OK", case: result.value });
});

module.exports = stuckedRouter;
