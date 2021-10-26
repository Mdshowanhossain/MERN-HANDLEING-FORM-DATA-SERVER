const UserModel = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");
// SIGN UP USER
const SignUpUser = async (req, res) => {
  try {
    const { name, email, mobile, profession, password, confirmpassword } =
      req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !profession ||
      !password ||
      !confirmpassword
    ) {
      return res.status(422).json({ error: "Please fddill all the property" });
    }

    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exists" });
    }

    if (password != confirmpassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }

    const saveUserData = new UserModel({
      name,
      email,
      mobile,
      profession,
      password,
      confirmpassword,
    });
    await saveUserData.save();
    res.status(201).json({ success: "User Created Successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// SIGN IN USER
const SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the fields!" });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ error: "Wrong Credentials!" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(422).json({ error: "Wrong Credentials!" });
    }

    if (matchPassword === true) {
      return res.status(200).json({ user });
    }
  } catch (err) {
    return res.status(500).json({ error: "There is a server side problem" });
  }
};

module.exports = { SignUpUser, SignInUser };
