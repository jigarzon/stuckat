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
router.get("/contact", async (req, res) => {
  if (!req.user.isAdmin) {
    res.statusCode(401).send("Unauthorized");
    return;
  }
  var Contact = req.db.collection('Contact')
  var data = await Contact.find();
  data.toArray((err, data) => {
    res.send({ result: "OK", contacts: data });
  });
});

router.delete("/contact/:id", async (req, res) => {
  if (!req.user.isAdmin) {
    res.statusCode(401).send("Unauthorized");
    return;
  }
  var Contact = req.db.collection('Contact')
  console.log("deleting contact msg", req.params.id)
  var result = await Contact.remove({_id: ObjectID(req.params.id)});
  res.send({ result: "OK" });
});
module.exports = router;
