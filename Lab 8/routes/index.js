const path = require("path");
const resultRoutes = require("./result");

const constructorMethod = app => {
  app.use("/result", resultRoutes);

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("static/index.html"));
  });
};

module.exports = constructorMethod;
