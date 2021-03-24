var http = require("http");
var fs = require("fs");
var path = require("path");
var express = require("express");
const app = express();
const port = 8056;

const members = require("./members");

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.origionalURL}`);
  next();
};

//init middleware
app.use(logger);

app.get("/api/members", (req, res) => {
  console.log(res.json(members));
});

//set a static folder:
app.use(express.static(path.join(__dirname, "public-static")));

app.listen(port, () => console.log("server started on port" + port));
