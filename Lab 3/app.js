// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const path = require("path");
const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const fileData = require("./fileData.js");
const textMetrics = require("./textMetrics.js");

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

async function testFunction(chapterName) {
  if (chapterName === undefined || !chapterName) {
    throw new Error(
      "The chapterName argument was not provided to testFunction"
    );
  }

  checkIsProperString(chapterName, "chapterName");

  if (fs.exists(path.join(__dirname, `${chapterName}.result.json`))) {
    console.log(
      JSON.stringify(
        fileData.getFileAsJSON(
          path.join(__dirname, `${chapterName}.result.json`)
        )
      )
    );
  } else {
    const readFile = fileData
      .getFileAsString(path.join(__dirname, `${chapterName}.txt`))
      .catch(err => {
        console.log(err);
      });
    const simplifiedText = textMetrics.simplify(await readFile);
    const metricsText = textMetrics.createMetrics(simplifiedText);
    fileData
      .saveStringToFile(
        path.join(__dirname, `${chapterName}.debug.txt`),
        simplifiedText
      )
      .catch(err => {
        console.log(err);
      });
    fileData
      .saveJSONToFile(
        path.join(__dirname, `${chapterName}.result.json`),
        metricsText
      )
      .catch(err => {
        console.log(err);
      });
    console.log(metricsText);
  }
}

testFunction("chapter1").catch(err => {
  console.log(err);
});

testFunction("chapter2").catch(err => {
  console.log(err);
});

testFunction("chapter3").catch(err => {
  console.log(err);
});

/*

// TESTING

fileData.getFileAsString();

console.log(textMetrics.simplify(""));
console.log(JSON.stringify(textMetrics.createMetrics(textMetrics.simplify(""))));

console.log(textMetrics.simplify("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23"));
console.log(JSON.stringify(textMetrics.createMetrics(textMetrics.simplify("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23"))));

//fileData.saveStringToFile(__dirname + '/test1.txt', "YELLOWWWWWW").catch(err => { console.log(err); });
//fileData.getFileAsString(__dirname + "/chapter1.txt").then(fileText => { console.log(fileText); }).catch(err => { console.log(err); });

//textMetrics.simplify("  jh    e sbn  gnj d s@#$   %^&   ").then(textConverted => { console.log(textConverted); }).catch(err => { console.log(err); });
//console.log(textMetrics.simplify("  jh    e sbn  gnj d s@#$   %^&   "));
//console.log(JSON.stringify(textMetrics.createMetrics(textMetrics.simplify("  jh    e sbn  gnj d s@#$   %^&   "))));

//fileData.getFileAsString(__dirname + "/chapter1.txt").then(fileText => { console.log(fileText); }).catch(err => { console.log(err); });
//fileData.getFileAsString(__dirname + "/chapter1.txt").then(fileText => { console.log(JSON.stringify(textMetrics.createMetrics(textMetrics.simplify(fileText)))); }).catch(err => { console.log(err); });

*/
