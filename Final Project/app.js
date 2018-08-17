const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");

const app = express();
const configRoutes = require("./routes");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const staticViews = express.static(`${__dirname}/public`);

app.use(cookieParser());
app.use("/public", staticViews);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
