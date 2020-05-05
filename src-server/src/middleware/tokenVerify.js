// THIS CLASS IS NOT BEING USED AND IS HERE AS AN EXAMPLE
const appConfig = require("../configs").appConfig;
var jwt = require("jsonwebtoken");

module.exports = function({ config }) {
  var key = appConfig.keyphrase;
  return async (req, res, next) => {
    const token = req.headers["access-token"];

    var publicRoute = false;
    if (req.path === "/contact") {
      publicRoute = true;
    }
    if (req.path.startsWith("/stats")) {
      publicRoute = true;
    }
    if (token) {
      jwt.verify(token, key, (err, decoded) => {
        if ((err) && !publicRoute) {
          return res.status(401).send("Invalid token");
        } else if (publicRoute) {
          next();
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else if (!publicRoute) {
      res.status(401).send("No token in header");
    } else {
      next();
    }
  };
};
