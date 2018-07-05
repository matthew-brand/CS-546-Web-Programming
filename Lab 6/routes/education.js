// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");
const data = require("../data");

const router = express.Router();
const educationData = data.education;

router.get("/", async (req, res) => {
  try {
    const educationInfo = educationData.getEducation();
    res.json(educationInfo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
