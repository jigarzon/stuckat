var tokenVerify = require("./tokenVerify");
var facebookAuth = require("./facebookAuth");
module.exports = function({ config }) {
  const routes = require("express").Router();

  routes.use("/api", tokenVerify({ config }));
  routes.use("/auth/facebook/callback", facebookAuth({ config }));
  return routes;
};
