// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");
const data = require("../data");

const router = express.Router();
const storyData = data.story;

router.get("/", async (req, res) => {
  try {
    const storyInfo = storyData.getStory();
    res.json(storyInfo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
