/* eslint-env browser */
// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

function getPalindrome(word) {
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

function buttonClicked() {
  const textBox = document.getElementById("phrase").value;
  if (!textBox || textBox.length === 0) {
    alert("You must enter a word in the text field!");
    throw new Error("You must enter a word in the text field!");
  }

  const ol = document.getElementById("attempts");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(textBox));
  ol.appendChild(li);

  if (getPalindrome(textBox)) {
    li.setAttribute("class", "is-palindrome");
    ol.appendChild(li);
  } else {
    li.setAttribute("class", "not-palindrome");
    ol.appendChild(li);
  }
}

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", buttonClicked);
