/* eslint-disable no-unused-vars */
var ObjectID = require('mongodb').ObjectID
const router = require("express").Router();
router.post("/contact", async (req, res) => {
  var Contact = req.db.collection('Contact')
  var contactForm = req.body;
  var userId = req.user ? new ObjectID(req.user._id) : null
  console.log("creating contact for user id", userId)
  contactForm.userId = userId;
  contactForm.createdAt = new Date()
  var result = await Contact.insertOne(contactForm);
  res.send({ result: "OK" });
});

module.exports = router;
