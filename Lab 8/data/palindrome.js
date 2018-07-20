function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

const exportedMethods = {
  getPalindrome(word) {
    checkIsProperString(word, "word");
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
