// const path = require("path");
const usersRoutes = require("./users");
const eventsRoutes = require("./events");

const data = require("../data");

const usersData = data.users;

const constructorMethod = app => {
  // Middleware

  let loggedInUsername = null;

  app.use(async (req, res, next) => {
    if (req.cookies) {
      const { sessionid } = req.cookies;
      if (sessionid !== undefined && sessionid !== null && sessionid !== "") {
        const user = await usersData.getUserBySessionID(sessionid);
        if (user !== null) {
          loggedInUsername = user.username;
        } else {
          loggedInUsername = null;
        }
      } else {
        loggedInUsername = null;
      }
    } else {
      loggedInUsername = null;
    }
    next();
  });

  app.get("/", (req, res) => {
    if (loggedInUsername != null) {
      res.render("home", { loggedIn: true, username: loggedInUsername });
    } else {
      res.render("home", { loggedIn: false });
    }
    // res.sendFile(path.resolve("index.html"));
  });

  app.post("/login", async (req, res) => {
    if (!req.body.username) {
      res.status(400).json({
        message: "You must supply a full account, you are missing the username"
      });
    } else if (!req.body.password) {
      res.status(400).json({
        message: "You must supply a full account, you are missing the password"
      });
    } else {
      const { username } = req.body;
      const { password } = req.body;
      try {
        const verified = await usersData.verifyPassword(username, password);
        if (verified === true) {
          // Correct password
          const user = await usersData.getUserByUsername(username);
          const userID = user._id;
          await usersData.setSessionID(userID);
          const usersSessionID = await usersData.getSessionID(userID);
          res
            .cookie("sessionid", usersSessionID, {
              expire: 360000 + Date.now()
            })
            .send(`Login successful, sessionid = ${usersSessionID}`);
        } else {
          // Incorrect password
          console.log("Wrong password");
          res.status(401).send("Wrong password");
        }
      } catch (e) {
        console.log(e);
        res.status(404).send("Error");
      }
    }
  });

  app.post("/createuser", async (req, res) => {
    if (!req.body.username) {
      res.status(400).json({
        message: "You must supply a full account, you are missing the username"
      });
    } else if (!req.body.password) {
      res.status(400).json({
        message: "You must supply a full account, you are missing the password"
      });
    } else if (!req.body.emailAddress) {
      res.status(400).json({
        message:
          "You must supply a full account, you are missing the email address"
      });
    } else {
      const freshUser = req.body;

      console.log(JSON.stringify(req.body));

      usersData
        .addUser(freshUser.username, freshUser.password, freshUser.emailAddress)
        .then(() => {
          res.json(freshUser);
        })
        .catch(e => {
          res.status(501).send(e);
        });
    }
  });

  // Auth middleware
  app.use(async (req, res, next) => {
    // console.log("Cookies: ", req.cookies);
    const { sessionid } = req.cookies;
    const user = await usersData.getUserBySessionID(sessionid);
    if (user === null) {
      res.send("Request denied, auth failed.");
    } else {
      console.log("Request allowed");
      next();
    }
  });

  app.get("/logout", async (req, res) => {
    const { sessionid } = req.cookies;
    const user = await usersData.getUserBySessionID(sessionid);
    const userID = user._id;
    usersData.clearSessionID(userID);
    res.clearCookie("sessionid").redirect("/");
  });

  app.use("/users", usersRoutes);
  app.use("/events", eventsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
