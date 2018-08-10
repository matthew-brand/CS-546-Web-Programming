const express = require("express");
// const uuidv1 = require("uuid/v1");

const router = express.Router();
const data = require("../data");

const usersData = data.users;

// Verifies correct password
router.get("/:id/:password", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "You must supply id" });
  } else if (!req.params.password) {
    res.status(400).json({ message: "You must supply password" });
  } else {
    const { id } = req.params;
    const { password } = req.params;
    try {
      const verified = await usersData.verifyPassword(id, password);
      res.json(verified);
    } catch (e) {
      res.status(404).json({ message: e });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const userList = await usersData.getAllUsers();
    res.json(userList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "You must supply id" });
    } else {
      const user = await usersData.getUserById(req.params.id);
      res.json(user);
    }
  } catch (e) {
    res.status(500).send("No user exists with that id");
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "You must supply an ID" });
  } else {
    try {
      usersData.removeUser(req.params.id);
      res.status(200).json({ message: "User deleted" });
    } catch (e) {
      res.status(404).json({ message: "User not found" });
    }
  }
});

module.exports = router;
