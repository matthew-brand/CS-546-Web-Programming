const { MongoClient } = require("mongodb");

const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "lab7-recipes"
  }
};

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
