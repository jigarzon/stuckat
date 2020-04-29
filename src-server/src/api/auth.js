const authRouter = require("express").Router();
var db = require("../db");
var ObjectID = require("mongodb").ObjectID;

authRouter.post("/contactInfo", async (req, res) => { 
  var User = req.db.collection('User')
  var result = await User.findOneAndUpdate(
    { _id: ObjectID(req.user.id) },
    { $set: { contactInfo: req.body } },
    { upsert: false }
  );
  res.status(200).send("ok");
});
module.exports = authRouter;
