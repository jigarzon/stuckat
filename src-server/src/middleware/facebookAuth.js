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
      url:
        "https://graph.facebook.com/" +
        appConfig.auth.facebook.graphVersion +
        "/me",
      params: {
        access_token: accessToken,
        fields: "first_name,last_name,email,picture"
      }
    };

    try {
      var resp = await axios(getUserInfo);
    } catch (e) {
      console.log(e.response.data);
      res.status(401).send("Error");
    }
    var extendTokenReq = {
      method: "get",
      url:
        "https://graph.facebook.com/" +
        appConfig.auth.facebook.graphVersion +
        "/oauth/access_token",
      params: {
        grant_type: "fb_exchange_token",
        client_id: appConfig.auth.facebook.clientId,
        client_secret: appConfig.auth.facebook.clientSecret,
        fb_exchange_token: accessToken
      }
    };
    var extendResp = await axios(extendTokenReq);

    var user = {};
    user.firstName = resp.data.first_name;
    user.lastName = resp.data.last_name;
    user.email = resp.data.email;
    user.avatar =
      resp.data.picture && resp.data.picture.data && resp.data.picture.data.url;
    user.facebookToken = extendResp.data.access_token;
    var result;
    user.updatedAt = new Date()
    if (user.email) {
      result = await User.findOneAndUpdate(
        { email: user.email },
        { $set: user },
        { upsert: true, returnOriginal: false }
      );
    } else {
      result = await User.insertOne(user)
    }
    var payload = {
      user: result.value,
      facebookToken: user.facebookToken
    };
    const token = jwt.sign(payload, appConfig.keyphrase, {
      expiresIn: 24 * 60 * 60
    });
    res.send({ user: result.value, accessToken: token });
  };
};
