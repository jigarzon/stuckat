/* eslint-disable no-unused-vars */
var ObjectID = require("mongodb").ObjectID;
const router = require("express").Router();

router.get("/stats/byProvince", async (req, res) => {
  var Case = req.db.collection("Case");
  var data = await Case.aggregate([
    { $group: { _id: "$origin.province.label", count: { $sum: 1 } } }
  ]);
  data.toArray((err, data) => {
    res.send({ result: "OK", data });
  });
});

module.exports = router;
