// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");

const app = express();
const staticViews = express.static(`${__dirname}/public`);

const configRoutes = require("./routes");

app.use("/public", staticViews);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
