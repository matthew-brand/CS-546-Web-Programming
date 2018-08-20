const path = require("path");
const data = require("../data");

const usersData = data.users;

const constructorMethod = app => {
  let loggedInUsername = null;

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
        const verified = await usersData.verifyLogin(username, password);
        if (verified === true) {
          // Correct password
          const user = await usersData.getUserByUsername(username);
          const userID = user._id;
          await usersData.setSessionID(userID);
          const usersSessionID = await usersData.getSessionID(userID);
          res
            .cookie("AuthCookie", usersSessionID, {
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

  app.use(async (req, res, next) => {
    const { AuthCookie } = req.cookies;
    const user = await usersData.getUserIDBySessionID(AuthCookie);
    if (user !== null) {
      loggedInUsername = user.username;
    } else {
      loggedInUsername = null;
    }
    next();
  });

  app.get("/", (req, res) => {
    if (loggedInUsername != null) {
      res.redirect("/private");
    } else {
      res.sendFile(path.join(`${__dirname}/../login.html`));
    }
  });

  app.get("/private", (req, res) => {
    if (loggedInUsername != null) {
      res.sendFile(path.join(`${__dirname}/../private.html`));
    } else {
      res.redirect("/");
    }
  });
  app.get("/logout", async (req, res) => {
    const { AuthCookie } = req.cookies;
    const userID = await usersData.getUserIDBySessionID(AuthCookie);
    usersData.clearSessionID(userID);
    res.clearCookie("AuthCookie").redirect("/");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
