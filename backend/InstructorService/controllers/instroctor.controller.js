const jwt = require("jsonwebtoken");
const Instructor = require("../models/instructor.model");

const secretKey = "YOUR_SECRET_KEY";

exports.registerInstructor = async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();

    res.status(201).send({ instructor, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ email: req.body.email });
    if (!instructor || !(await instructor.checkPassword(req.body.password))) {
      return res.status(401).send({ error: "Login failed!" });
    }
    const token = jwt.sign({ _id: instructor._id }, secretKey, {
      expiresIn: "24h",
    });
    res.send({ instructor, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.updateInstructor = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "contactNumber",
    "profileImage",
    "uniqueCode",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).send({ error: "Instructor not found." });
    }

    updates.forEach((update) => (instructor[update] = req.body[update]));
    await instructor.save();

    res.send({ instructor });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!instructor) {
      return res.status(404).send({ error: "Instructor not found." });
    }

    res.send({ message: "Instructor deleted successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({});
    res.send(instructors);
  } catch (error) {
    res.status(500).send(error);
  }
};
