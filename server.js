const express = require("express");
const app = express();
require("dotenv").config();
require("./DB/db.js");

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("aslfj");
});

app.listen(PORT, () => {
  console.log(`Your Server is Running Now At ${PORT}`);
});
