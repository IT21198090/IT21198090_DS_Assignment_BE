const Enrollment = require("../models/enrollment.models");

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const existingEnrollment = await Enrollment.findOne({
      studentId,
      courseId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .send({ message: "Student is already enrolled in this course." });
    }

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();
    res.status(201).send(enrollment);
  } catch (error) {
    res.status(500).send({ message: "Error creating enrollment", error });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.send(enrollments);
  } catch (error) {
    res.status(500).send({ message: "Error fetching enrollments", error });
  }
};

// Get a single enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate(
      "studentId courseId"
    );
    if (!enrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.send(enrollment);
  } catch (error) {
    res.status(500).send({ message: "Error fetching enrollment", error });
  }
};

// Update an enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { studentId, courseId },
      { new: true }
    );
    if (!enrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.send(enrollment);
  } catch (error) {
    res.status(500).send({ message: "Error updating enrollment", error });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.send({ message: "Enrollment deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting enrollment", error });
  }
};
