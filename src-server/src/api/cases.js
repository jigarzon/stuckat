/* eslint-disable no-unused-vars */
var ObjectID = require("mongodb").ObjectID;
const stuckedRouter = require("express").Router();
stuckedRouter.post("/cases", async (req, res) => {
  var Case = req.db.collection("Case");
  var caseInfo = req.body;
  console.log("creating case for user id", req.user._id);
  var userId = new ObjectID(req.user._id);
  caseInfo.userId = userId;
  caseInfo.createdAt = new Date();
  var result = await Case.insertOne(caseInfo);
  res.send({ result: "OK", case: result.value });
});
stuckedRouter.get("/cases/all", async (req, res) => {
  if (!req.user.isAdmin) {
    res.statusCode(401).send("Unauthorized");
  } else {
    var Case = req.db.collection("Case");
    var data = Case.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);
    data.toArray((err, data) => {
      var resp = data.map(row => {
        if (row.user && row.user.length) {
          var user = row.user[0];
          delete user.facebookToken;
          delete user.googleToken;
          delete user.avatar;
          row.user = user;
        }
        return row;
      });
      res.send({ result: "OK", cases: resp });
    });
  }
});
stuckedRouter.get("/cases/:id", async (req, res) => {
  if (!req.user.isAdmin) {
    res.statusCode(401).send("Unauthorized");
  } else {
    var Case = req.db.collection("Case");
    var data = await Case.findOne({ _id: ObjectID(req.params.id) });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("not found");
    }
  }
});
module.exports = stuckedRouter;
