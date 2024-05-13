const express = require("express");
const router = express.Router();
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollment.controller");

// Create a new enrollment
router.post("/enrollments", createEnrollment);

// Retrieve all enrollments
router.get("/enrollments", getAllEnrollments);

// Retrieve a single enrollment by ID
router.get("/enrollments/:id", getEnrollmentById);

// Update an enrollment by ID
router.put("/enrollments/:id", updateEnrollment);

// Delete an enrollment by ID
router.delete("/enrollments/:id", deleteEnrollment);

module.exports = router;
