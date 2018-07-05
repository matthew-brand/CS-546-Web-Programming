// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");
const data = require("../data");

const router = express.Router();
const aboutData = data.about;

router.get("/", async (req, res) => {
  try {
    const aboutInfo = aboutData.getAbout();
    res.json(aboutInfo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
