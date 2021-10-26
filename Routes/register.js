const express = require("express");
const router = express.Router();
const {
  SignUpUser,
  SignInUser,
} = require("../controllers/signupController.js");

// PEOPLE SIGNUP
router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);

module.exports = router;
