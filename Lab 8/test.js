const word = "test";
const reversedWord = word
  .replace(/[^0-9a-z]/gi, "")
  .replace(/\s/g, "")
  .toLowerCase()
  .split()
  .reverse()
  .join();
console.log(reversedWord);
