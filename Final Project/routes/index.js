const usersRoutes = require("./users");
const eventsRoutes = require("./events");

const constructorMethod = app => {
  app.use("/users", usersRoutes);
  app.use("/events", eventsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
