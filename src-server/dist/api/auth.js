'use strict';

var authRouter = require('express').Router();

authRouter.post('/login', function (req, res) {
  setTimeout(function () {
    try {
      if (req.body.facebookToken) {
        res.json({ token: '1234' });
      } else {
        res.status(401).send('invalid token');
      }
    } catch (e) {
      console.error('error val token', e);
      res.status(500).send(e);
    }
  }, 2000);
});
module.exports = authRouter;
//# sourceMappingURL=auth.js.map