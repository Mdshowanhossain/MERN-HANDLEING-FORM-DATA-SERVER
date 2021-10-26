const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    mobile: {
      type: String,
      require: true,
      trim: true,
    },
    profession: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    confirmpassword: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timeStamps: true }
);
const userModel = mongoose.model(people, user);
module.exports = userModel;
