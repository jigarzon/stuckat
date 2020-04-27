const authRouter = require("express").Router();
var db = require("../db");

authRouter.post("/contactInfo", async (req, res) => { 
  var User = req.db.collection('User')
  var result = await User.findOneAndUpdate(
    { id: req.user.id },
    { $set: { contactInfo: req.body } },
    { upsert: false }
  );
  res.status(200).send("ok");
});
module.exports = authRouter;
