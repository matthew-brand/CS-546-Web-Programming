module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
    "prettier/prettier": "error",
    "no-underscore-dangle": [2, { allow: ["_id"] }]
  }
};
