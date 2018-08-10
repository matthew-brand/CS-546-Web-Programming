const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const configRoutes = require("./routes");

const staticViews = express.static(`${__dirname}/public`);

app.use("/public", staticViews);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
