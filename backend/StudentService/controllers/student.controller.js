const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentController = {
  // Create a new student
  createStudent: async (req, res) => {
    try {
      const {
        studentName,
        itNumber,
        email,
        password,
        nicNumber,
        address,
        contactNumber,
      } = req.body;
      const newStudent = new Student({
        studentName,
        itNumber,
        email,
        password,
        nicNumber,
        address,
        contactNumber,
      });
      await newStudent.save();
      res
        .status(201)
        .json({ message: "Student created successfully", newStudent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve all students
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve a single student by ID
  getStudentById: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a student by ID
  updateStudent: async (req, res) => {
    try {
      const updates = req.body;
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
      const student = await Student.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res
        .status(200)
        .json({ message: "Student updated successfully", student });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a student
  deleteStudent: async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  loginStudent: async (req, res) => {
    try {
      const { email, password } = req.body;
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: student._id, role: "student" },
        "YOUR_SECRET_KEY",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful", token, student });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = studentController;
