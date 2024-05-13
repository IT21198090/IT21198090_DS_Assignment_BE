const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  contentType: {
    type: String,
    required: [true, "Content type is required"],
    enum: ["LectureNote", "Notice", "Material"],
    trim: true,
  },
  contentUrl: {
    type: String,
    required: true,
    trim: true,
  },

  publishDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
