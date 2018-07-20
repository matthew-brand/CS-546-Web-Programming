const exportedMethods = {
  getPalindrome(word) {
    console.log(word);
    const filteredWord = word
      .replace(/[^0-9a-z]/gi, "")
      .replace(/\s/g, "")
      .toLowerCase();
    const reversedWord = filteredWord
      .split("")
      .reverse("")
      .join("");
    return reversedWord === filteredWord;
  }
};

module.exports = exportedMethods;
