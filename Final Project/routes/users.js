const express = require("express");
const uuidv1 = require('uuid/v1');
const router = express.Router();
const data = require("../data");
const usersData = data.users;

router.get("/:id", async (req, res) => {
  if(!req.params.id) {
    res.status(400).json({ message: "You must supply an ID" });
  }
  else{
    try {
      const user = await usersData.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(404).json({ message: "User not found" });
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

router.post("/", async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.emailAddress) {
      res.status(400).json({ message: "You must supply a full account, you are missing parts" });
    }
    else{
      let freshUser = req.body;

    usersData.addUser(freshUser.username, freshUser.password, freshUser.emailAddress)
      .then((freshUser) => {
        res.json(freshUser);
      }).catch ((e) => {
        res.status(501).send();
      });
    }
});

router.delete("/:id", async (req, res) => {
  if(!req.params.id){
    res.status(400).json({ message: "You must supply an ID" });
  }
  else {
    try{
      usersData.removeUser(req.params.id);
      res.status(200).json({message: "User deleted"});
    }catch (e) {
      res.status(404).json({ message: "User not found" });
    }
  }
});

module.exports = router;
