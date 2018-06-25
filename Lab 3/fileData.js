// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

function checkIsProperObject(val, variableName) {
  if (typeof val !== "object") {
    throw new Error(`${variableName} is not an object`);
  }
}

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

exports.getFileAsString = async function getFileAsString(path) {
  if (path === undefined || !path) {
    throw new Error("The path argument was not provided to getFileAsString");
  }

  checkIsProperString(path, "path");

  const fileText = fs.readFileAsync(path, "utf-8").catch(err => {
    console.log(err);
  });
  const fileContent = await fileText;
  return fileContent;
};

exports.getFileAsJSON = async function getFileAsJSON(path) {
  if (path === undefined || !path) {
    throw new Error("The path argument was not provided to getFileAsJSON");
  }

  checkIsProperString(path, "path");

  const fileText = fs.readFileAsync(path, "utf-8").catch(err => {
    console.log(err);
  });
  const fileContent = await fileText;
  const jsonObject = JSON.stringify(fileContent);
  return jsonObject;
};

exports.saveStringToFile = async function saveStringToFile(path, text) {
  if (path === undefined || !path) {
    throw new Error("The path argument was not provided to saveStringToFile");
  }

  if (text === undefined || !text) {
    throw new Error("The text argument was not provided to saveStringToFile");
  }

  checkIsProperString(path, "path");
  checkIsProperString(text, "text");

  await fs.writeFileAsync(path, text).catch(err => {
    console.log(err);
  });
};

exports.saveJSONToFile = async function saveJSONToFile(path, obj) {
  if (path === undefined || !path) {
    throw new Error("The path argument was not provided to saveJSONToFile");
  }

  if (obj === undefined || !obj) {
    throw new Error("The obj argument was not provided to saveJSONToFile");
  }

  checkIsProperString(path, "path");
  checkIsProperObject(obj, "obj");

  await fs.writeFileAsync(path, JSON.stringify(obj)).catch(err => {
    console.log(err);
  });
};
