var mysql = require("mysql");
var appConfig = require("../configs").appConfig;

var pool  = mysql.createPool(appConfig.db.connection);
module.exports.db = pool;
