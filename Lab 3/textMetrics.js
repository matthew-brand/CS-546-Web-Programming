// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

exports.simplify = function simplify(text) {
  if (text === undefined || !text) {
    throw new Error("The text argument was not provided to simplify");
  }

  checkIsProperString(text, "text");

  const textLowerCase = text.toLowerCase();
  const textReplaced = textLowerCase.replace(/[^A-Za-z\s]/g, "");
  const textSpaces = textReplaced.replace(/\s/g, " ");
  const textSingleSpaces = textSpaces.replace(/ +(?= )/g, "");
  const textTrimmed = textSingleSpaces.trim();
  return textTrimmed;
};

exports.createMetrics = function createMetrics(text) {
  if (text === undefined || !text) {
    throw new Error("The text argument was not provided to createMetrics");
  }

  checkIsProperString(text, "text");

  const metrics = {
    totalLetters: 0,
    totalWords: 0,
    uniqueWords: 0,
    longWords: 0,
    averageWordLength: 0,
    wordOccurences: { "": 0 }
  };
  metrics.totalLetters = text.replace(/[^a-zA-Z]/g, "").length;
  const wordArray = text.split(" ");
  metrics.totalWords = wordArray.length;
  const dict = {};
  wordArray.forEach(word => {
    if (dict[word] == null) {
      dict[word] = 1;
    } else {
      dict[word] += 1;
    }
  });
  const uniqueArray = Object.keys(dict);
  metrics.uniqueWords = uniqueArray.length;
  let countLongWords = 0;
  wordArray.forEach(word => {
    if (word.length >= 6) {
      countLongWords += 1;
    }
  });
  metrics.longWords = countLongWords;
  metrics.averageWordLength = metrics.totalLetters / metrics.totalWords;
  metrics.wordOccurences = dict;
  return metrics;
};
