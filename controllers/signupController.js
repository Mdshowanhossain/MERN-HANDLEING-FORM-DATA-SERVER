const UserModel = require("../models/userSchema.js");

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

    const userExist = await UserModel.findOne({ name: name, email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exists" });
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

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(422).json({ error: "Wrong Credentials!" });
    }

    const matchPassword = user.password === password;

    if (matchPassword === true) {
      res.status(422).json({ error: "Wrong Credentials!" });
    }

    // if (user) {
    //   if (password === user.password) {
    //     res.status(200).json({ success: "Welcome Sir" });
    //   }
    // }

    // if (password === user.password) {
    //   return res.status(200).json({ success: "Welcome Sir" });
    // }

    res.send(user);
  } catch (err) {}
};

module.exports = { SignUpUser, SignInUser };
