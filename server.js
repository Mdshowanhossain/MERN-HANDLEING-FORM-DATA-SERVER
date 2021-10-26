const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();
require("./DB/db.js");

const Signup = require("./Routes/signup");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: true }));

app.use("/", Signup);

app.listen(PORT, () => {
  console.log(`Your Server is Running Now At ${PORT}`);
});
