const MongoClient = require('mongodb').MongoClient
var appConfig = require('../configs').appConfig
const url = appConfig.db.connection
// Database Name
const dbName = appConfig.db.name
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
var db = async function () {
  await client.connect()
  var database = client.db(dbName)
  return {
    db: database,
    User: database.collection('User')
  }
}
module.exports.client = client
module.exports.db = db
