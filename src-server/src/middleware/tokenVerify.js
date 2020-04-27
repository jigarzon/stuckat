// THIS CLASS IS NOT BEING USED AND IS HERE AS AN EXAMPLE
const appConfig = require('../configs').appConfig
var jwt = require("jsonwebtoken");

module.exports = function({ config }) {
  var key = appConfig.keyphrase
  return async (req, res, next) => {
    const token = req.headers["access-token"];
    // if (req.path === '/log' || (req.path.startsWith('/rfps') && req.method === 'GET')) {
      //   next()
      //   return
      // }
    if (token) {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.status(401).send("Invalid token");
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).send("No token in header");
    }
  };
};
