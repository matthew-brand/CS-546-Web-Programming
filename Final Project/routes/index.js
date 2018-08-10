const path = require("path");
const usersRoutes = require("./users");
const eventsRoutes = require("./events");

const constructorMethod = app => {
  // Middleware

  app.use("/users", usersRoutes);
  app.use("/events", eventsRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
