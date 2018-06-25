// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

function checkIsProperNumber(val, variableName) {
  if (typeof val !== "number") {
    throw new Error(`${variableName} is not a number`);
  }

  if (Number.isNaN(val)) {
    throw new Error(`${variableName} is NaN`);
  }
}

module.exports = {
  volumeOfRectangularPrism: (length, width, height) => {
    if (length === undefined) {
      throw new Error("The length argument was not provided");
    } else if (width === undefined) {
      throw new Error("The width argument was not provided");
    } else if (height === undefined) {
      throw new Error("The height argument was not provided");
    } else if (length < 0) {
      throw new Error("length cannot be below zero");
    } else if (width < 0) {
      throw new Error("width cannot be below zero");
    } else if (height < 0) {
      throw new Error("height cannot be below zero");
    } else {
      checkIsProperNumber(length, "length");
      checkIsProperNumber(width, "width");
      checkIsProperNumber(height, "height");
      return length * width * height;
    }
  },
  surfaceAreaOfRectangularPrism: (length, width, height) => {
    if (length === undefined) {
      throw new Error("The length argument was not provided");
    } else if (width === undefined) {
      throw new Error("The width argument was not provided");
    } else if (height === undefined) {
      throw new Error("The height argument was not provided");
    } else if (length < 0) {
      throw new Error("length cannot be below zero");
    } else if (width < 0) {
      throw new Error("width cannot be below zero");
    } else if (height < 0) {
      throw new Error("height cannot be below zero");
    } else {
      checkIsProperNumber(length, "length");
      checkIsProperNumber(width, "width");
      checkIsProperNumber(height, "height");
      return 2 * length * width + 2 * length * height + 2 * width * height;
    }
  },
  volumeOfSphere: radius => {
    if (radius === undefined) {
      throw new Error("The radius argument was not provided");
    } else if (radius < 0) {
      throw new Error("radius cannot be below zero");
    } else {
      checkIsProperNumber(radius, "radius");
      return (4 / 3) * Math.PI * radius ** 3;
    }
  },
  surfaceAreaOfSphere: radius => {
    if (radius === undefined) {
      throw new Error("The radius argument was not provided");
    } else if (radius < 0) {
      throw new Error("radius cannot be below zero");
    } else {
      checkIsProperNumber(radius, "radius");
      return 4 * Math.PI * radius ** 2;
    }
  }
};
