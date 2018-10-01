const { XMLHttpRequest } = require("xmlhttprequest");

const word = "hello";
const url = `https://api.datamuse.com/words?ml=${word}`;

const xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4) {
    if (xmlhttp.status == 200) {
      const obj = JSON.parse(xmlhttp.responseText);

      const done = [];
      obj.forEach(object => {
        done.push([object.word, object.score, object.tags]);
      });

      console.log(JSON.stringify(done));
    }
  }
};
xmlhttp.send(null);

function search(string) {
  string.replaceAll("[^a-zA-Z]", "");
  const wordArray = string.split(" ");
  wordArray.forEach(entry => {
    console.log(entry);
  });
}
