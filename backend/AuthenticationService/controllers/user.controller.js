const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const secretKey = "YOUR_SECRET_KEY";

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, secretKey, {
      expiresIn: "24h",
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(401).send({ error: "Login failed!" });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, secretKey, {
      expiresIn: "24h",
    });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log("called");
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    return user
      ? res.send(user)
      : res.status(404).send({ error: "User not found." });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "firstName",
      "lastName",
      "address",
      "email",
      "password",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
