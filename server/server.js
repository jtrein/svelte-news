const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const server = express();
const NEWS_API_KEY = process.env.NEWS_API_KEY;

server.get("/latest/:country", function(req, res) {
  
  res.send([]);
});

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
