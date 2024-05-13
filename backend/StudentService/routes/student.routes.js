const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

// Routes for the Student model
router.post("/students", studentController.createStudent);
router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);
router.post("/students/login", studentController.loginStudent);

module.exports = router;
