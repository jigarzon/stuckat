const MongoClient = require("mongodb").MongoClient;
var appConfig = require("../configs").appConfig;
const url = appConfig.db.connection;
// Database Name
const dbName = appConfig.db.name;
var expressMongoDb = require("express-mongo-db");

module.exports.handleDatabase = function({ app }) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // var db = async function() {
  //   await client.connect();
  //   var database = client.db(dbName);
  //   return {
  //     db: database,
  //     User: database.collection("User"),
  //     Case: database.collection("Case")
  //   };
  // };
  var connection;
  var db;
  app.use(async (req, res, next) => {
    if (!connection) {
      try {
        connection = await client.connect();
      } catch (e) {
        next(e);
        return;
      }
    }
    if (!db) {
      db = connection.db()
    }
    req.db = db;
    next();
  });
};
