const express = require("express");
const router = express.Router();
const Course = require("../models/course.model");

// Middleware imports
const authenticate = require("../middlwares/authentication.middlware");
const authorize = require("../middlwares/authorize.middlware");
// GET all courses (Accessible by anyone authenticated)
router.get("/", authenticate, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// GET a course by ID (Accessible by anyone authenticated)
router.get("/:id", authenticate, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send("Course not found");
  }
  res.json(course);
});

// POST a new course (Only admin and instructors)
router.post(
  "/",
  authenticate,
  authorize(["admin", "instructor"]),
  async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  }
);

// DELETE a course (Only admin and instructors)
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "instructor"]),
  async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.send("Course deleted");
  }
);

// UPDATE a course (Only admin and instructors)
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "instructor"]),
  async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.send(course);
  }
);

module.exports = router;
