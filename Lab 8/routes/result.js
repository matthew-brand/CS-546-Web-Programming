const express = require("express");

const router = express.Router();
const data = require("../data");

const resultData = data.result;

router.post("/", (req, res) => {
  const palindromeData = req.body;

  if (!palindromeData.word) {
    return res.status(400).render("result/error");
  }

  try {
    const palindromeCheck = {
      answer: resultData.getPalindrome(palindromeData.word),
      word: palindromeData.word
    };
    if (palindromeCheck.answer) {
      return res.render("result/true", { palindromeCheck });
    }
    return res.render("result/false", { palindromeCheck });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
