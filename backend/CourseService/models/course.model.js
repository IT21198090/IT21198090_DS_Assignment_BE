const mongoose = require("mongoose");

// Define the schema for the course
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from the beginning and end
  },
  description: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  enrollmentKey: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the model from the schema
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
