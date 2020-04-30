const authRouter = require("express").Router();
var db = require("../db");
var ObjectID = require("mongodb").ObjectID;

authRouter.post("/contactInfo", async (req, res) => {
  var User = req.db.collection("User");
  console.log("updating user info", req.user._id, req.body);
  var result = await User.findOneAndUpdate(
    { _id: ObjectID(req.user._id) },
    { $set: { contactInfo: req.body } }
  );
  res.status(200).send("ok");
});
module.exports = authRouter;
