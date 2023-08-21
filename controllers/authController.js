const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.json({ message: "User already exists.." });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ user: newUser, token: token });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.json({ message: "User is not found" });
    }

    const credentials = await bcrypt.compare(password, existingUser.password);
    if (!credentials) {
      return res.json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        existingUser,
        id: existingUser._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ user: existingUser, token: token });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { register, login };
