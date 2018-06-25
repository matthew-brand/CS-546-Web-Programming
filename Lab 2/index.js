// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const geometry = require("./geometry");

const utilities = require("./utilities");

/* volumeOfRectangularPrism: (length, width, height) */
console.log("\nvolumeOfRectangularPrism: (length, width, height)");
console.log(geometry.volumeOfRectangularPrism(1, 2, 3)); // Outputs 6
console.log(geometry.volumeOfRectangularPrism(6, 3, 4)); // Outputs 72
console.log(geometry.volumeOfRectangularPrism(3, 7, 5)); // Outputs 105
console.log(geometry.volumeOfRectangularPrism(7, 3, 9)); // Outputs 189
console.log(geometry.volumeOfRectangularPrism(2, 9, 2)); // Outputs 36

// console.log(geometry.volumeOfRectangularPrism(undefined, 2, 3)); // Missing length
// console.log(geometry.volumeOfRectangularPrism(1, undefined, 3)); // Missing width
// console.log(geometry.volumeOfRectangularPrism(1, 2, undefined)); // Missing height

// console.log(geometry.volumeOfRectangularPrism("test", 2, 3)); // Length is not a number
// console.log(geometry.volumeOfRectangularPrism(1, "test", 3)); // Width is not a number
// console.log(geometry.volumeOfRectangularPrism(1, 2, "test")); // Height is not a number

// console.log(geometry.volumeOfRectangularPrism(-1, 2, 3)); // Length is less than 0
// console.log(geometry.volumeOfRectangularPrism(1, -2, 3)); // Width is less than 0
// console.log(geometry.volumeOfRectangularPrism(1, 2, -3)); // Height is less than 0

/* surfaceAreaOfRectangularPrism: (length, width, height) */
console.log("\nsurfaceAreaOfRectangularPrism: (length, width, height)");
console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, 3)); // Outputs 22
console.log(geometry.surfaceAreaOfRectangularPrism(6, 3, 4)); // Outputs 108
console.log(geometry.surfaceAreaOfRectangularPrism(3, 7, 5)); // Outputs 142
console.log(geometry.surfaceAreaOfRectangularPrism(7, 3, 9)); // Outputs 222
console.log(geometry.surfaceAreaOfRectangularPrism(2, 9, 2)); // Outputs 80

// console.log(geometry.surfaceAreaOfRectangularPrism(undefined, 2, 3)); // Missing length
// console.log(geometry.surfaceAreaOfRectangularPrism(1, undefined, 3)); // Missing width
// console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, undefined)); // Missing height

// console.log(geometry.surfaceAreaOfRectangularPrism("test", 2, 3)); // Length is not a number
// console.log(geometry.surfaceAreaOfRectangularPrism(1, "test", 3)); // Width is not a number
// console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, "test")); // Height is not a number

// console.log(geometry.surfaceAreaOfRectangularPrism(-1, 2, 3)); // Length is less than 0
// console.log(geometry.surfaceAreaOfRectangularPrism(1, -2, 3)); // Width is less than 0
// console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, -3)); // Height is less than 0

/* volumeOfSphere: (radius) */
console.log("\nvolumeOfSphere: (radius)");
console.log(geometry.volumeOfSphere(3)); // Outputs 113.09733...
console.log(geometry.volumeOfSphere(5)); // Outputs 523.59877...
console.log(geometry.volumeOfSphere(6)); // Outputs 904.77868...
console.log(geometry.volumeOfSphere(8)); // Outputs 2144.66058...
console.log(geometry.volumeOfSphere(9)); // Outputs 3053.62805...

// console.log(geometry.volumeOfSphere(undefined)); // Missing radius

// console.log(geometry.volumeOfSphere("test")); // Radius is not a number

// console.log(geometry.volumeOfSphere(-3)); // Radius is less than 0

/* surfaceAreaOfSphere: (radius) */
console.log("\nsurfaceAreaOfSphere: (radius)");
console.log(geometry.surfaceAreaOfSphere(3)); // Outputs 113.09733...
console.log(geometry.surfaceAreaOfSphere(5)); // Outputs 314.15926...
console.log(geometry.surfaceAreaOfSphere(6)); // Outputs 452.38934...
console.log(geometry.surfaceAreaOfSphere(8)); // Outputs 804.24771...
console.log(geometry.surfaceAreaOfSphere(9)); // Outputs 1017.87601...

// console.log(geometry.surfaceAreaOfSphere(undefined)); // Missing radius

// console.log(geometry.surfaceAreaOfSphere("test")); // Radius is not a number

// console.log(geometry.surfaceAreaOfSphere(-6)); // Radius is less than 0

/* deepEquality: (obj1, obj2) */
console.log("\ndeepEquality: (obj1, obj2)");
const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const fourth = { a: 2, b: 4 };
console.log(utilities.deepEquality(first, second)); // Outputs false
console.log(utilities.deepEquality(first, third)); // Outputs true
console.log(utilities.deepEquality(second, third)); // Outputs false
console.log(utilities.deepEquality(fourth, second)); // Outputs true
console.log(utilities.deepEquality(first, fourth)); // Outputs false

// console.log(utilities.deepEquality(undefined, second)); // Missing obj1
// console.log(utilities.deepEquality(first, undefined)); // Missing obj2

// console.log(utilities.deepEquality("test", second)); // Obj1 is not an object
// console.log(utilities.deepEquality(first, "test")); // Obj2 is not an object

/* uniqueElements: (arr) */
console.log("\nuniqueElements: (arr)");
const testArr1 = ["a", "a", "b", "a", "b", "c"];
console.log(utilities.uniqueElements(testArr1)); // Outputs 3
const testArr2 = ["a", "f", "b", "a", "b", "c"];
console.log(utilities.uniqueElements(testArr2)); // Outputs 4
const testArr3 = ["a", "a", "b", "g", "s", "c"];
console.log(utilities.uniqueElements(testArr3)); // Outputs 5
const testArr4 = ["a", "h", "n", "e", "b", "c"];
console.log(utilities.uniqueElements(testArr4)); // Outputs 6
const testArr5 = ["a", "a", "a", "a", "a", "a"];
console.log(utilities.uniqueElements(testArr5)); // Outputs 1

// console.log(utilities.uniqueElements(undefined)); // Missing arr

// console.log(utilities.uniqueElements("test")); // Arr is not an array

/* countOfEachCharacterInString: (str) */
console.log("\ncountOfEachCharacterInString: (str)");
const test1 = "Hello, the pie is in the oven";
const charMap1 = utilities.countOfEachCharacterInString(test1); // Returns correct result
console.log(JSON.stringify(charMap1, null, 4));
const test2 = "This is question number 2";
const charMap2 = utilities.countOfEachCharacterInString(test2); // Returns correct result
console.log(JSON.stringify(charMap2, null, 4));
const test3 = "#$%^&&^%$@#$%^&&&^%$$";
const charMap3 = utilities.countOfEachCharacterInString(test3); // Returns correct result
console.log(JSON.stringify(charMap3, null, 4));
const test4 = "I hope that I get a hundred on this lab!";
const charMap4 = utilities.countOfEachCharacterInString(test4); // Returns correct result
console.log(JSON.stringify(charMap4, null, 4));
const test5 = "Computer Science Rocks!!";
const charMap5 = utilities.countOfEachCharacterInString(test5); // Returns correct result
console.log(JSON.stringify(charMap5, null, 4));

// const charMap6 = utilities.countOfEachCharacterInString(undefined); // Missing str

// const charMap7 = utilities.countOfEachCharacterInString(1); // Str is not a string
