// "I pledge my honor thaqt I have abided by the Stevens Honor System" - Matthew Brand
const questionOne = function questionOne(arr) {
  const numbersToAdd = arr;
  let squareSums = 0;

  numbersToAdd.forEach(num => {
    const squared = num * num;
    squareSums += squared;
  });

  return squareSums;
};

const questionTwo = function questionTwo(num) {
  if (num < 1) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  return questionTwo(num - 1) + questionTwo(num - 2);
};

const questionThree = function questionThree(text) {
  let count = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (
      text.toLowerCase().charAt(i) === "a" ||
      text.toLowerCase().charAt(i) === "e" ||
      text.toLowerCase().charAt(i) === "i" ||
      text.toLowerCase().charAt(i) === "o" ||
      text.toLowerCase().charAt(i) === "u"
    ) {
      count += 1;
    }
  }
  return count;
};

const questionFour = function questionFour(num) {
  if (num === -1) {
    return NaN;
  }
  if (num === 0) {
    return 1;
  }
  if (num === 1) {
    return 1;
  }
  return num * questionFour(num - 1);
};

module.exports = {
  firstName: "Matthew",
  lastName: "Brand",
  studentId: "10410988",
  questionOne,
  questionTwo,
  questionThree,
  questionFour
};
