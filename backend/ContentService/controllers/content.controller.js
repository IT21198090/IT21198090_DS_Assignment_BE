const Content = require("../models/content.model");

const contentController = {
  createContent: async (req, res) => {
    try {
      const { title, description, contentType, contentUrl, isActive } =
        req.body;
      const newContent = new Content({
        title,
        description,
        contentType,
        contentUrl,
        isActive,
      });
      await newContent.save();
      res
        .status(201)
        .send({ message: "Content created successfully", data: newContent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllContents: async (req, res) => {
    try {
      const contents = await Content.find({});
      res.status(200).json(contents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getContentById: async (req, res) => {
    try {
      const content = await Content.findById(req.params.id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateContent: async (req, res) => {
    try {
      const { title, description, contentType, contentUrl, isActive } =
        req.body;
      const content = await Content.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          contentType,
          contentUrl,
          isActive,
        },
        { new: true }
      );

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res
        .status(200)
        .json({ message: "Content updated successfully", data: content });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteContent: async (req, res) => {
    try {
      const content = await Content.findByIdAndDelete(req.params.id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = contentController;
