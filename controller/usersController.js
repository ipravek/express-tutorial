const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const getUser = (req, res) => {
  res.json(req.params);
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username,
      password: encPassword,
    });

    const token = await jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
      expiresIn: "10min",
    });

    user.token = token;

    if (!user) res.json("error while creating user");

    res.json({ id: user.id, username: user.username, token: user.token });
  } catch (e) {
    res.json(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await jwt.sign(
        { user_id: user.id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10min",
        }
      );

      res.json({ id: user.id, token: token });
    } else {
      res.json({ message: "invalid password or username" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getUser, createUser, loginUser };
