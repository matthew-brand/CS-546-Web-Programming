// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const recipeRoutes = require("./recipes");

const constructorMethod = app => {
  app.use("/recipes", recipeRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
