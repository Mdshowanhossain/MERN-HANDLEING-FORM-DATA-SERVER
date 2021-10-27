const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
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
    tokens: [
      {
        token: {
          type: String,
          require: true,
          trim: true,
        },
      },
    ],
  },
  { timeStamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    next();
  }
});

UserSchema.methods.generateToken = async function () {
  try {
    let token = await jwt.sign(
      {
        _id: this._id,
        name: this.name,
        profession: this.profession,
      },
      process.env.JWT_SECRET_KEY
    );

    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    return res.status(500).json({ error: "Server side problem" });
  }
};

const userModel = mongoose.model("people", UserSchema);
module.exports = userModel;
