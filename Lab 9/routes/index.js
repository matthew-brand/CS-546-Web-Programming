const path = require("path");

const constructorMethod = app => {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("static/index.html"));
  });
};

module.exports = constructorMethod;
