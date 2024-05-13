const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");

router.post("/contents", contentController.createContent);
router.get("/contents", contentController.getAllContents);
router.get("/contents/:id", contentController.getContentById);
router.put("/contents/:id", contentController.updateContent);
router.delete("/contents/:id", contentController.deleteContent);

module.exports = router;
