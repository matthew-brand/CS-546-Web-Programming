const path = require("path");
const data = require("../data");

const usersData = data.users;

const constructorMethod = app => {
  let loggedInUserID = null;

  app.use(async (req, res, next) => {
    const { AuthCookie } = req.cookies;
    const userID = await usersData.getUserIDBySessionID(AuthCookie);
    if (userID !== null) {
      loggedInUserID = userID;
    } else {
      loggedInUserID = null;
    }
    next();
  });

  app.post("/login", async (req, res) => {
    if (loggedInUserID != null) {
      res.render("private");
    }
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
            .redirect("/private");
        } else {
          // Incorrect password
          console.log("Wrong password");
          res.render("loginincorrect");
        }
      } catch (e) {
        console.log(e);
        res.status(404).send("Error");
      }
    }
  });

  app.get("/", (req, res) => {
    if (loggedInUserID != null) {
      res.redirect("/private");
    } else {
      res.render("login");
    }
  });

  app.get("/private", async (req, res) => {
    if (loggedInUserID != null) {
      const user = await usersData.getUserByID(loggedInUserID);
      res.render("private", {
        username: user.username,
        first: user.firstName,
        last: user.lastName,
        profession: user.profession,
        bio: user.bio
      });
    } else {
      res.status(403).render("loginnotloggedin");
    }
  });
  app.get("/logout", async (req, res) => {
    const { AuthCookie } = req.cookies;
    const userID = await usersData.getUserIDBySessionID(AuthCookie);
    usersData.clearSessionID(userID);
    res.clearCookie("AuthCookie").render("loginloggedout");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
