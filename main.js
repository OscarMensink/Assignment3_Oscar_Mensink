#!/usr/bin nodejs
var http = require("http");
var fs = require("fs");
const path = require("path");
var express = require("express");
var app = express();

//static files in use:
//var staticPath = path.join(__dirname, "public-static");

//!/usr/bin nodejs
var http = require(`http`);
const mainServer = http.createServer(function (req, res) {
  // if (req.url === "/") {
  //   res.writeHead(200, { "Content-Type": `text/html` });
  //   fs.readFile(
  //     path.join(__dirname, "public-static", "index.html"),
  //     null,
  //     function (error, indexPG) {
  //       if (error) {
  //         console.log("it is working, SIKE");
  //         res.writeHead(404);
  //         res.write("file not found");
  //       } else {
  //         console.log("got this far");
  //         console.log(indexPG);
  //         res.end(indexPG);
  //         console.log("listening on port 8056");
  //       }
  //       res.end();
  //     }
  //   );
  // }

  //build file path
  var filePath = path.join(
    __dirname,
    "public-static",
    req.url == "/" ? "index.html" : req.url
  );
  console.log(filePath);
  //extension of filepath
  let extName = path.extname(filePath);

  //intitial content type
  var contentType = "text/html";

  // Check ext and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public-static", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

mainServer.listen(8056, `localhost`);
