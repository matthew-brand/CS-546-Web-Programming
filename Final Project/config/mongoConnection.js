const { MongoClient } = require("mongodb");

const mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "ftf_db"
};

let connection;
let db;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoConfig.serverUrl);
    db = await connection.db(mongoConfig.database);
  }

  return db;
};
