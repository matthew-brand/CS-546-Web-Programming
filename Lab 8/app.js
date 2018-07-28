// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const staticViews = express.static(`${__dirname}/public`);

const exphbs = require("express-handlebars");
const configRoutes = require("./routes");

app.use("/public", staticViews);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
