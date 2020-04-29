// THIS CLASS IS NOT BEING USED AND IS HERE AS AN EXAMPLE
const appConfig = require("../configs").appConfig;
var axios = require("axios");
var jwt = require("jsonwebtoken");
module.exports = function({ config }) {
  return async (req, res, next) => {
    var accessToken;
    var User = req.db.collection("User");

    if (!req.query.access_token) {
      res.status(401).end();
      return;
    } else {
      accessToken = req.query.access_token;
    }
    var getUserInfo = {
      method: "get",
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
      params: {
        access_token: accessToken,
        alt: "json"
      }
    };

    try {
      var resp = await axios(getUserInfo);
    } catch (e) {
      console.log(e.response.data);
      res.status(401).send("Error");
    }

    var user = {};
    user.firstName = resp.data.given_name;
    user.lastName = resp.data.family_name;
    user.email = resp.data.email;
    user.avatar = resp.data.picture;
    user.googleToken = accessToken;
    var result = await User.findOneAndUpdate(
      { email: user.email },
      { $set: user },
      { upsert: true, returnOriginal: false }
    );
    var payload = {
      user: result.value,
      googleToken: user.googleToken
    };
    const token = jwt.sign(payload, appConfig.keyphrase, {
      expiresIn: 24 * 60 * 60
    });
    res.send({ user: result.value, accessToken: token });
  };
};
