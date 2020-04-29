var tokenVerify = require("./tokenVerify");
var facebookAuth = require("./facebookAuth");
var googleAuth = require("./googleAuth");

module.exports = function({ config }) {
  const routes = require("express").Router();

  routes.use("/api", tokenVerify({ config }));
  routes.use("/auth/facebook/callback", facebookAuth({ config }));
  routes.use("/auth/google/callback", googleAuth({ config }));
  return routes;
};
