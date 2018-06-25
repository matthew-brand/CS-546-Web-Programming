// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

function checkIsProperObject(val, variableName) {
  if (typeof val !== "object") {
    throw new Error(`${variableName} is not an object`);
  }
}

function checkIsProperArray(val, variableName) {
  if (!Array.isArray(val)) {
    throw new Error(`${variableName} is not an array`);
  }
}

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

module.exports = {
  deepEquality: (obj1, obj2) => {
    if (obj1 === undefined) {
      throw new Error("The obj1 argument was not provided");
    } else if (obj2 === undefined) {
      throw new Error("The obj2 argument was not provided");
    } else {
      checkIsProperObject(obj1, "obj1");
      checkIsProperObject(obj2, "obj2");
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
  },
  uniqueElements: arr => {
    if (arr === undefined) {
      throw new Error("The arr argument was not provided");
    } else {
      checkIsProperArray(arr, "arr");
      const arr2 = [];
      arr.forEach(element => {
        if (!arr2.includes(element)) {
          arr2.push(element);
        }
      });
      return arr2.length;
    }
  },
  countOfEachCharacterInString: str => {
    if (str === undefined) {
      throw new Error("The str argument was not provided");
    } else {
      checkIsProperString(str, "str");
      const myObj = {};
      for (let i = 0; i < str.length; i += 1) {
        myObj[str.charAt(i)] = (
          str.match(new RegExp(str.charAt(i), "g")) || []
        ).length;
      }
      return myObj;
    }
  }
};
