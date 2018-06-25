const { MongoClient } = require("mongodb");
const settings = require("./settings");

const { mongoConfig } = settings;

let connection;
let db;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoConfig.serverUrl);
    db = await connection.db(mongoConfig.database);
  }

  return db;
};
