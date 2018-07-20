const express = require("express");

const router = express.Router();
const data = require("../data");

const resultData = data.result;

/*

router.post("/:word", async (req, res) => {
  try {
    const palindromeCheck = await resultData.getPalindrome(req.params.word);
    if (palindromeCheck) {
      res.send("true");
    } else {
      res.send("false");
    }

    res.send(palindromeCheck);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
});

*/

router.post("/", (req, res) => {
  const palindromeData = req.body;
  const palindromeCheck = {
    answer: resultData.getPalindrome(palindromeData.word),
    word: palindromeData.word
  };
  if (palindromeCheck.answer) {
    res.render("result/true", { palindromeCheck });
  } else {
    res.render("result/false", { palindromeCheck });
  }
});

module.exports = router;
